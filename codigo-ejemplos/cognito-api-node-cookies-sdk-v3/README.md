# API con Node y Cognito, utilizando el AWS SDK de Javascript en su versión 3

El objetivo de este proyecto, es ofrecer una API hecha con un backend en Node, que ofrezca autenticación y acceso a rutas protegidas. Usaremos cookies para almacenar el token de refresco (o refresh token) y luego usarlo para renovar tokens. Además veremos cómo usar tokens de acceso y de identificación (access/id tokens) de Cognito para acceder a recursos mediante un Identity Pool (o grupo de identidades).

Utilizaremos la autorización con tokens de tipo 'Bearer', y usaremos varios métodos del SDK para interactuar con AWS Cognito. Incluiremos operaciones típicas de la API de autenticación, como hacer signin o signout, renovar tokens, revocar tokens, acceder a listar buckets de AWS S3 e insertar registros en AWS DynamoDB mediante un Identity Pool, y otras operaciones interesantes.

En los videos del curso mostraremos cómo acceder a esta API mediante Postman para abstraernos un poco de la parte frontend, que podrá ser realizada con alguna libería como React, Angular, etc.
Usaremos el AWS SDK de Javacript en su versión 3 y el SDK de Cognito. También se utiliza la importación de módulos propia de ES6 (usando "import") en lugar de usar la sintaxis de CommonJS, que usa "require".


## Tecnologías 

* Node y npm
* Nodemon
* ES6
* SDK de Cognito y AWS SDK para Javascript versión 3
* User Pools e Identity Pools de AWS Cognito

## Cómo ejecutar el código

Para ejecutar el código de forma sencilla, debemos situarnos en la carpeta del proyecto y utilizar el comando `npm install`, el cuál instalará todas las dependencias necesarias.

Después de instalar todas las dependencias, podemos ejecutar el código en modo producción o ejecutarlo en modo desarrollo usando los comandos:

* `npm run dev` para ejecutar en modo desarrollo.

* `npm run start` para preparar ejecutable para modo producción.

Los diferentes scripts que se pueden usar están en el archivo package.json

## Dependencias utilizadas

Para instalar las dependencias de forma separada (si no se usa el comando `npm install`), es necesario ejecutar los siguientes comandos de npm:

* `npm i @aws-sdk/client-cognito-identity-provider`

* `npm i @aws-sdk/credential-provider-cognito-identity`

* `npm i @aws-sdk/client-dynamodb`

* `npm i @aws-sdk/client-s3`

* `npm install body-parser`

* `npm install cookie-parser`

* `npm install cors`

* `npm install dotenv`

* `npm install express`

* `npm install jsonwebtoken`

* `npm install axios`

* `npm install crypto`

* `npm install csrf-csrf`

* `npm install jwks-rsa`

* `npm install jwt-decode`

* `npm install passport`

* `npm install passport-jwt`

* `npm install nodemon -D`

## Referencias

- [AWS SDK de Javascript versión 3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/) - Guía inicio del SDK de Javascript versión 3 de AWS. Podremos ver cómo instalar módulos, configuración, referencias y mucho más.

- [AWS SDK de Javascript versión 3 (parte Cognito User Pools)](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/preview/Package/-aws-sdk-client-cognito-identity-provider/) - Documentación AWS SDK versión 3 parte Cognito User Pools.

- [AWS SDK de Javascript versión 3 (parte Cognito Identity Pools)](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/preview/Package/-aws-sdk-client-cognito-identity/) - Documentación AWS SDK versión 3 parte Cognito Identity Pools. 

- [Guía para desarrolladores de AWS Cognito](https://docs.aws.amazon.com/es_es/cognito/latest/developerguide/what-is-amazon-cognito.html) - Documentación guía para desarrolladores Cognito.


