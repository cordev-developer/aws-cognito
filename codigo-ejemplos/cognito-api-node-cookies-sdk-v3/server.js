import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { doubleCsrf } from "csrf-csrf";
import {
  InitiateAuthCommand, RevokeTokenCommand,GlobalSignOutCommand, 
  CognitoIdentityProviderClient, SignUpCommand, GetUserCommand, ConfirmSignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import {
  CognitoIdentityClient
} from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";
import { PutItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import jwksRsa from 'jwks-rsa';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { createHmac } from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const whitelist = ['http://localhost:3001', 'https://aws.amazon.com'];

const options = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not Allowed.'));
    }
  }
}


app.use(cors(options));


// Configurar las credenciales para el cliente de Cognito Identity Provider
// const credentials = {
//   accessKeyId: "AKIA37XTGD7BSERGZB5T",
//   secretAccessKey: "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",
// }

// Creamos el cliente de Cognito Identity Provider en la región "us-east-1" (N. Virginia) 
// const client = new CognitoIdentityProviderClient({ region: "us-east-1" , credentials });
const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

const authAxios = axios.create({
  baseURL: process.env.COGNITO_DOMAIN,
});


// Definimos un array de productos para simular una base de datos
const products = [
    {
        id: 1,
        name: 'Manzanas rojas',
        precio: '12.3'
    },
    {
        id: 2,
        name: 'Naranjas de Valencia',
        precio: '4.3'
    },
    {
        id: 3,
        name: 'Aguacates',
        precio: '2.45'
    },
    {
        id: 4,
        name: 'Plátanos de Canarias',
        precio: '22.4'
    }
];


const {
  generateToken,          // Use this in your routes to provide a CSRF hash + token cookie and token.
  doubleCsrfProtection,   // This is the default CSRF protection middleware.
  
} = doubleCsrf({
  getSecret: () => "Secret123",               // A function that optionally takes the request and returns a secret
  // cookieName: "__Host-psifi.x-csrf-token", // The name of the cookie to be used, recommend using Host prefix.
  cookieName: "jcorral.x-csrf-token", 


  cookieOptions: {
    sameSite: "lax",
    path: "/",
    secure: false,      // Set to true if you are using HTTPS
  },

  ignoredMethods: ["GET", "HEAD", "OPTIONS"], // A list of request methods that will not be protected.
});


// Definimos la ruta para obtener el token CSRF
const myRoute = (request, response) => {
  const csrfToken = generateToken(request, response);
  response.json({ csrfToken });
};

app.get("/api/csrf-token", myRoute);

// Usamos el middleware de CSRF para todas las rutas (por defecto no se aplica a rutas GET)
app.use(doubleCsrfProtection);



// Definimos la ruta para el login o signin de un usuario
app.post('/api/signin', async (req, res) => {
    const { userName, password } = req.body;

    const InitiateAuthRequest = { // InitiateAuthRequest
      AuthFlow: "USER_PASSWORD_AUTH",// required
  
      AuthParameters: { // AuthParametersType (required)
        USERNAME: userName,
        PASSWORD: password,
        // SECRET_HASH: generateSecretHashOrBase64(process.env.CLIENT_ID, process.env.CLIENT_SECRET, userName)
      },
  
      ClientId: process.env.CLIENT_ID, // required
    };
  
    let response;
    
    try {
      const command = new InitiateAuthCommand(InitiateAuthRequest);
      response = await client.send(command);
      
    } catch (err) {
        return res
          .status(400)
          .json({ message: `Error no se ha podido hacer login: ${err.message}`});
    }

    res.cookie('refreshToken', response.AuthenticationResult.RefreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return res
      .status(200)
      // enviar el token de acceso, el id token y el refresh token separados en un json
      .json({ accessToken: response.AuthenticationResult.AccessToken,  
              idToken: response.AuthenticationResult.IdToken, 
              refreshToken: response.AuthenticationResult.RefreshToken,});
});


// Ruta para el signup o registro de un usuario (requerimos el email también)
app.post('/api/signup', async (req, res) => {
  const { userName, password, email } = req.body;

  let response;
  
  try {

    const command = new SignUpCommand({
      ClientId: process.env.CLIENT_ID,
      Username: userName,
      Password: password,
      UserAttributes: [{ Name: "email", Value: email }],
      // Si el user pool tiene secret, entonces es necesario pasar el secret hash
      // SecretHash: generateSecretHashOrBase64(process.env.CLIENT_ID, process.env.CLIENT_SECRET, userName)
    });

    response = await client.send(command);
    
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Error en comando signup: ${err.message}`});
  }

  return res
    .status(200)
    .json({ message: `Usuario ${userName} se ha registrado correctamente, se ha enviado el código de verificación ` });
});


// Ruta para confirmar el registro de un usuario
app.post('/api/confirm-signup', async (req, res) => {
  const { userName, code } = req.body;

  let response;
  
  try {

    const command = new ConfirmSignUpCommand({
      ClientId: process.env.CLIENT_ID,
      Username: userName,
      ConfirmationCode: code,
      // Si el user pool tiene secret, entonces es necesario pasar el secret hash
      // SecretHash: generateSecretHashOrBase64(process.env.CLIENT_ID, process.env.CLIENT_SECRET, userName)
  });

    response = await client.send(command);
    
  } catch (err) {
    return res
      .status(400)
      .json({ message: `Error en comando confirm signup: ${err.message}`});
  }

  return res
    .status(200)
    .json({ message: `Usuario ${userName} se ha confirmado correctamente` });
});


// Ruta para refrescar los tokens de acceso y de identidad a través del refresh token.
// En el body tenemos que pasarle el username del usuario (si usamos el client secret).
// Si el user pool no tiene client secret, tenemos que desactivar la opción "Device tracking" 
// de la pestaña "Sign-in experience" de nuestro user pool, y seleccionar la opción "Don't remember".
app.post('/api/refresh-token', async (req, res, next) => {

  const { refreshToken } = req.cookies;
  const { userName } = req.body;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: 'Unauthorized' });
  }

  const InitiateAuthRequest  = {
    AuthFlow: 'REFRESH_TOKEN_AUTH',
    ClientId: process.env.CLIENT_ID,

    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
      // SECRET_HASH: generateSecretHashOrBase64(process.env.CLIENT_ID, process.env.CLIENT_SECRET, userName)
    },
  };

  let response;
  
  try {
    const command = new InitiateAuthCommand(InitiateAuthRequest);
    response = await client.send(command);

    return res.status(200).json({ message: 'Has renovado los tokens correctamente. ',
                                  idtoken: response.AuthenticationResult.IdToken,
                                  accesstoken: response.AuthenticationResult.AccessToken });    

  } catch (err) {
    next(err);
  }
});


// Middleware para adjuntar el token de usuario (tipo Bearer) a la request
const attachUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Autenticación no válida no hay token' });
  }
  // Extraemos el token eliminando el prefijo 'Bearer '
  const decodedToken = jwtDecode(token.slice(7));

  if (!decodedToken) {
    return res.status(401).json({
      message: 'Autenticación no válida, no hay decoded token'
    });
  } else {
    // Adjuntamos el token decodificado a la request
    req.user = decodedToken;
    next();
  }
};


app.use(attachUser);


// Definimos middleware de passport para la autenticación
passport.use(new JwtStrategy({
  // Para obtener la clave pública, usamos jwksRsa
  secretOrKeyProvider: jwksRsa.passportJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 100,
    jwksUri: process.env.COGNITO_JWKS_URI,
    // jwksCacheDuration: 60 * 60 * 1000, // 1 hora
    // jwksRequestTimeout: 10000, // tiempo de espera en ms (10 segundos)
  }),
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

  // Valida el audience (depende de si queremos validar sólo id token)
  // audience: process.env.COGNITO_AUDIENCE_CLIENT_ID,
  issuer: process.env.COGNITO_JWKS_ISSUER,
  algorithms: ['RS256'],
    
  passReqToCallback: true, // Configuración para pasar la request al callback (opcional)

  // callback para verificar el token
  }, (req, payload, done) => {
 
    // Accede a los atributos del objeto
    const tokenUse  = payload.token_use;
    const client_id = payload.client_id;
    const aud = payload.aud;


    // Aquí podriamos también comprobar los permisos, grupos, roles, etc de los tokens de acceso y/o identificación
    // if (payload['cognito:roles'] === 'my_cognito_role' && payload['cognito:groups'] === 'my_cognito_group') {
    //   console.log('Usuario con rol "my_cognito_role" o grupo "my_cognito_group"');
    // }


    if (tokenUse === 'id' && aud === process.env.COGNITO_AUDIENCE_CLIENT_ID) {        // Es un token de identidad y además comprobamos el audience
      // return done(null, false)   // Si no queremos aceptar los id tokens, retornamos false
      return done(null, payload);   // Si queremos validar el id token, retornamos el payload
    } else if (tokenUse === 'access' && client_id === process.env.COGNITO_AUDIENCE_CLIENT_ID) {
      return done(null, payload);   // Si queremos validar el access token, retornamos el payload
    } else {
      return done(null, false);     
    }
}));


// Creamos el middleware de autenticación
const authMiddleware = passport.authenticate('jwt', { session: false });


// Obtener información del usuario (requerimos estar autenticados) a través del comando GetUserCommand.
// No podemos llamar al endpoint de .../oauth2/userInfo porque el token de acceso que tenemos no es un
// token de OIDC (le falta el campo permiso o scope = "openid"), ya que estamos usando el comando InitiateAuthCommand
// para emitir los tokens de acceso e identidad.
app.get('/api/userinfo', doubleCsrfProtection, authMiddleware, async (req, res, next) => {
  try {

    const input = {
      AccessToken:  req.headers.authorization.slice(7), // required
    }

    const command = new GetUserCommand(input);
    const response = await client.send(command);

    res
      .status(200)
      .json({ message: 'El usuario es: ' + response.Username + ' y su email es: ' + response.UserAttributes[2].Value  });

  } catch (err) {
    next(err);
  }
});


// Definimos la ruta para obtener los productos (será necesario estar autenticado)
// Lo que hacemos es solicitar info el usuario a través del comando GetUserCommand,
// le tenemos que pasar el access token, con el id token no funcionará.
app.get('/api/products', authMiddleware, async (req, res) => {
  try {

    const input = {
      AccessToken:  req.headers.authorization.slice(7), // required
    }

    const command = new GetUserCommand(input);
    const response = await client.send(command);

    res
      .status(200)
      .json({ products });

  } catch (err) {
        return res.status(400).json({
        message: 'Hubo un problema al intentar obtener los productos.'
    });
  }
});



// Definimos la ruta para revocar tokens a través del refresh token
// También requerimos estar autenticados.
app.post('/api/revoke-token', authMiddleware, async (req, res, next) => {

  const { refreshToken } = req.cookies;
  const  userName = req.user.username;  // Si es un id token, el username lo obtenemos del campo "cognito:username"

  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: 'Unauthorized: no hay refresh token' });
  } 


  // Descomentar para usar el punto de revocación de tokens
  // const secret_hash = generateSecretHashOrBase64(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
  // const headers = {
  //   'Accept': 'application/json',
  //   // 'Authorization': `Basic ${secret_hash}`,
  //   'Content-Type': 'application/x-www-form-urlencoded',
  // }
  // const data = {
  //   token: refreshToken,
  //   client_id: process.env.CLIENT_ID,
  // }

  // input to the revoque command
  const input = { 
    Token: refreshToken,                      // required
    ClientId: process.env.CLIENT_ID,          // required
    // ClientSecret: process.env.CLIENT_SECRET,  // required if the client ID has a secret
  };
  
    // Revocamos el refresh token
  try {

    // Esta petición al punto de revocación tarda unos 600ms
    // Start mesure execution time method
    // console.time('RevokeTokenEndpoint');
    // const response = await authAxios.post('/oauth2/revoke', data, { headers });
    // // End mesure execution time method
    // console.timeEnd('RevokeTokenEndpoint');

    // Si usamos el comando RevokeTokenCommand tarda unos 150ms
    const command = new RevokeTokenCommand(input);
    // Mesure execution time
    console.time('RevokeTokenCommand');
    const response = await client.send(command);
    // Mesure end execution time
    console.timeEnd('RevokeTokenCommand');
    
    res
      .status(200)
      .json({ message: `Se han revocado los tokens de acceso del usuario: ${userName}` });
        
  } catch (err) {
    // Pasamos al control de errores
    next(err);
  }
});



// Definimos la ruta para hacer logout de un usuario, de manera que se 
// invaliden los tokens de acceso, identidad y refresco de ese usuario. 
// También requerimos estar autenticados.
app.post('/api/signout', authMiddleware, async (req, res, next) => {

  const userName = req.user.username;  

  const input = {
    AccessToken:  req.headers.authorization.slice(7), // required
  }

  try {
    const command = new GlobalSignOutCommand(input);
    const response = await client.send(command);

  } catch (err) {
    next(err);
  }

    // Borramos las cookies y retornamos un 200 ok
    res.clearCookie("refreshToken");
    res.clearCookie("jcorral.x-csrf-token");
  
    res
      .status(200)
      .json({ message: `El usuario ${userName} ha hecho logout correctamente` });
});



// Definimos la ruta para obtener los buckets de S3
// En el authorization header tenemos que pasarle el id token del usuario autenticado
app.get('/api/list-s3-buckets', authMiddleware, async (req, res, next) => {
  const { userPoolId, identityPoolId, region } = req.body;

  const cognitoClient = new CognitoIdentityClient({
    region: region, 
    // credentials: credentials,
  });

  try {
    // Configura el cliente de S3 con el identity pool y el access token del usuario autenticado
    const s3Client = new S3Client({
      region,
      credentials: fromCognitoIdentityPool({
        client: cognitoClient, 
        identityPoolId: identityPoolId,
        logins: {
          [`cognito-idp.${region}.amazonaws.com/${userPoolId}`]: req.headers.authorization.slice(7),
        },
      }),
    });

    // Listamos los buckets de S3
    const response = await s3Client.send(new ListBucketsCommand({}));

    console.log("Buckets disponibles:");
      response.Buckets.forEach((bucket) => {
        console.log(bucket.Name);
    });

    res
      .status(200)
      .json({ bucketsList: response.Buckets });

  } catch (error) {
    console.error("Error en listBuckets: ", error);
    next(error);
  }
});



// Definimos la ruta para insertar un registro en la tabla de DynamoDB
// En el authorization header tenemos que pasarle el id token del usuario autenticado
app.post('/api/insert-dynamodb', authMiddleware, async (req, res, next) => {
  const { userPoolId, identityPoolId, region } = req.body;

  const cognitoClient = new CognitoIdentityClient({
    region: region, 
    // credentials: credentials,
  });

  try {

    const dynamoDBClient  = new DynamoDBClient({
      region,       // Región de la tabla de DynamoDB
      credentials: fromCognitoIdentityPool({
        client: cognitoClient, 
        identityPoolId: identityPoolId,
        logins: {
          [`cognito-idp.${region}.amazonaws.com/${userPoolId}`]: req.headers.authorization.slice(7),
        },
      }),
    });

    // Parámetros para insertar un registro en la tabla de DynamoDB (la tabla tiene que existir con el id como clave primaria 
    // que está en formato N numérico)
    const params = {
      TableName: "PutItemsWithCognito",     // Nombre de la tabla de DynamoDB
      Item: {
        id: { N: "3" },
        title: { S: "aTitle_3" },
        name: { S: "aName_3" },
        body: { S: "aBody_3" },
      },
    };

    // Insertamos registros en la tabla de DynamoDB
    const response = await dynamoDBClient.send(new PutItemCommand(params));

    console.log("Esta es la response: ", response);
    res
      .status(201)
      .json({ message: 'Elemento insertado correctamente en DynamoDb.' });

  } catch (error) {
    console.error("Error en putItemDynamoDB: ", error);
    next(error);
  }
});



// Función para generar el Secret Hash
const generateSecretHashOrBase64 = (clientId, clientSecret, username)   => {
  
  if (username) {
    const hmac = createHmac('sha256', clientSecret);
    hmac.update(username + clientId);
    return Buffer.from(hmac.digest()).toString('base64');

  } else if (!username) {
    const clientCredentials = `${clientId}:${clientSecret}`;
    return Buffer.from(clientCredentials).toString('base64');
  }
}



// Manejador de errores
app.use(function(err, req, res, next) {
  if (err.name === 'InvalidTokenError' || err.name === 'TokenExpiredError' 
      || err.name === 'JsonWebTokenError' || err.name === 'NotBeforeError' || err.name === 'NotAuthorizedException') {
    // Personalizamos el mensaje de error
    return res.status(401).json({ error: 'Unauthorized. El token JWT no es válido' });
  } else if (err.statusCode === 400) {
    return res.status(400).json({ error: 'Bad request' });
  } else if (err.statusCode === 403) {
    return res.status(403).json({ error: 'Forbidden' });
  } else {
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Levantamos servidor
app.listen(process.env.PORT, () => {
    console.log(`Escuchando por el puerto ${process.env.PORT}`);
});

