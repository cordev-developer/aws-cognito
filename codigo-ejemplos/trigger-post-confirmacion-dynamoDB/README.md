# Trigger lambda post confirmación con Cognito y DynamoDB 

Ejemplo de trigger o desencadenador lambda de postconfirmación (usando la v3 del SDK de Javascript).
 
También incluye el fichero "lambda-write-dynamoDB-policy" que contiene la política que hay que añadir a la función lambda para que pueda escribir en la tabla de Dynamo DB, es importante que donde se especifica en el fichero escribais vuestro ID account de vuestra cuenta de AWS (identificador de cuenta). Además también tendreis que ponder la región donde tengais definida la función lambda, por ejemplo (us-east-1 u otras). 

Finalmente podeis llamar con otro nombre la tabla de Dynamo DB (en este ejemplo es la tabla "Usuarios"), siempre que hagais las modificaciones necesarias también en la política, etc.


## Tecnologías 

* Funciones Lambda de AWS con Cognito


## Cómo ejecutar el código

Para ejecutar el código, sólo debemos cargar el fichero de la función lambda ("index.mjs") y configurar correctamente el trigger lambda de Cognito (trigger postconfirmación).
La función lambda escribirá un registro en la base de datos de DynamoDB, cada vez que un usuario confirme la cuenta al registrarse. 

Podremos escribir un identificador único de usuario generado desde el código de la función lambda, o bien podemos también escribir el atributo "sub" del token de identificación, es decir, el identificador único que genera Cognito para cada usuario. Por tanto, cada vez que un usuario confirme su cuenta, se escribirá un registro en la base de datos (tabla "Usuarios") de DynamoDB.

Para instalar las dependencias, situarse en el directorio raíz y ejecutar:

* `npm install` para instalar las dependencias.


Para instalar las dependencias de forma manual, situarse en el directorio raíz y ejecutar:

* `npm install uuid` para instalar el paquete que genera el identificador único.


## Referencias

- [AWS SDK de Javascript versión 3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/) - Guía inicio del SDK de Javascript versión 3 de AWS. Podremos ver cómo instalar módulos, configuración, referencias y mucho más.

- [Guía AWS SDK Javascript v3 (parte de Cognito)](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-cognito-identity-provider) - Aquí tenemos una guía de las funciones que podemos usar de Cognito.

- [Guía documentación AWS SDK Javascript v3, versión nueva (no está completa)](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/preview/client/cognito-identity-provider) - Es una versión nueva de la documentació oficial de la versión 3 del SDK de Javascript, pero OJO !! no está todavía terminada, por lo que no están incluidas todas las funcionalidades.



