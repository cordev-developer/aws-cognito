// const AWS = require("aws-sdk");
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { v4 as uuidv4 } from 'uuid';

const client = new DynamoDBClient({region: 'us-east-1'});

export const handler = async (event, context, callback) => {
  const currentDate = new Date();
  const isoDate = currentDate.toISOString();
  
  const id = uuidv4();
  
  const params = {
    TableName: "Usuarios",

    Item: {
      // Para generar un identificador único.
      // UsuarioUUID: { S: id },

      // O para insertar el atributo "sub" que genera Cognito para cada usuario.
      UsuarioUUID: { S:  event.request.userAttributes.sub },
      Email: { S: event.request.userAttributes.email },
      Creado: { S: isoDate }
    },
  };
  

  // Creamos comando
  const command = new PutItemCommand(params);

  try {
    // Ejecuta el comando PutItemCommand 
    const data = await client.send(command);
    
    console.log(data);

    // Retornamos a Amazon Cognito
    callback(null, event);
    
  } catch (error) {
    
    // Devolvemos error
    callback(new Error("Error ejecutando comando putItem !!"), event);
  }
};



// Configuración del evento JSON de test
// {
//   "request": {
//     "userAttributes": {
//       "email": "testuser1@example.com",
//       "sub": "123456789"
//     }
//   },
//   "response": {}
// }