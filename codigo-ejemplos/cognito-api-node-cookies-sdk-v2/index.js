require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const jwt = require('jsonwebtoken');


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

// const poolData = new AmazonCognitoIdentity.CognitoUserPool({
//     UserPoolId: process.env.USER_POOL_ID,
//     ClientId: process.env.CLIENT_ID
// });

const products = [
    {
        id: 1,
        name: 'crema afeitar',
        precio: '12.3'
    },
    {
        id: 2,
        name: 'naranjas',
        precio: '4.3'
    },
    {
        id: 3,
        name: 'nueces',
        precio: '2.45'
    },
    {
        id: 4,
        name: 'colonia magic',
        precio: '22.4'
    }
];

app.get('/api/authenticate', (req, res) => {
    // const { userName, password } = req.body;

    const poolData = {
        UserPoolId: process.env.USER_POOL_ID,
        ClientId: process.env.CLIENT_ID
    };

    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
    const userData = {
        Username : 'jcorralf', // your username here
        Pool : userPool
    };
    
    const authenticationData = {
        Username : 'jcorralf', // your username here
        Password : 'Jcorralf_1975#', // your password here
    };
    
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {       

            const accessToken = jwt.decode(result.getAccessToken().getJwtToken());

            res.cookie('token', result.getRefreshToken().getToken(), {
                expires: new Date(
                    result.getAccessToken().getExpiration() * 1000 + (1000*60*60*24*30)
                ),
                httpOnly: true,
                // secure: true,
                // sameSite: 'lax'
            });
        
            res.json({
                message: 'Authentication successfull !',
                token: accessToken,
                userName: accessToken.username,
                expiresAt: accessToken.exp
            });
        },

        onFailure: function(err) {
            if(err.code === 'NotAuthorizedException') {
                console.log("Incorrect username or password.");
                res.status(403).json({  
                    message: err.message,
                    errorCode: err.code,
                });
            } else {
                return res.status(400).json("Bad request.");
            }
        }
    });
});



const attachUser = (req, res, next) => {

  const refreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({
    RefreshToken: req.cookies.token
  });

  if (!refreshToken) {
    return res.status(401).json({ message: "Token invalid." });
  }

  const poolData = {
    UserPoolId: process.env.USER_POOL_ID,
    ClientId: process.env.CLIENT_ID,
  };

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const userData = {
    Username: "jcorralf",
    Pool: userPool,
  };

  let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  let accessToken = "";
  let decodedToken = "";

  cognitoUser = userPool.getCurrentUser();

  cognitoUser.getSession(function(err, result) {
    if (result) {
        console.log('You are now logged in.');
        console.log('El access token de la sesión es: ' + result.getAccessToken().getJwtToken());
        decodedToken = jwt.decode(accessToken);
        req.user = decodedToken;
        next();
    } else {
        return res.status(401).json({
            message: "Unauthorized."
        });
    }
  });  
};

app.use(attachUser);


// const requireAdmin = (req, res, next) => {
//   const { role } = req.user;
//   if (role !== 'admin') {
//     return res
//       .status(401)
//       .json({ message: 'Insufficient role' });
//   }
//   next();
// };



// app.get(
//   '/api/inventory',
//   requireAuth,
//   requireAdmin,
//   async (req, res) => {
//     try {
//       const user = req.user.sub;
//       const inventoryItems = await InventoryItem.find({
//         user
//       });
//       res.json(inventoryItems);
//     } catch (err) {
//       return res.status(400).json({ error: err });
//     }
//   }
// );



app.get('/api/products', (req, res) => {
  try {
    res.json({ products });

  } catch (err) {
        return res.status(400).json({
        message: 'There was a problem getting the products.'
    });
  }
});



app.listen(process.env.PORT, () => {
    console.log(`Escuchando por el puerto ${process.env.PORT}`);
});

