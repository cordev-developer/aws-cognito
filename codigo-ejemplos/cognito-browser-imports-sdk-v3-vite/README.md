# Cognito con AWS SDK de Javascript versión 3 (con imports y Vite)

En este proyecto se muestra cómo usar el SDK de Javacript de Cognito en su versión 3. También se utiliza la importación de módulos propia de ES6 (usando "import") en lugar de usar la sintaxis de CommonJS, que usa "require".

El código está configurado para usar Vite com bundler o empaquetador, permitiendo así obtener los ficheros resultantes de la distribución en la carpeta "dist" (de distribution), dónde se obtienen los ficheros html, css y javascript resultantes. 

## Tecnologías 

* Node y npm
* Vite y ES6
* Amazon Cognito Identity SDK para Javascript versión 3


## Cómo ejecutar el código

Para ejecutar el código de forma sencilla, debemos situarnos en la carpeta del proyecto y utilizar el comando `npm install`, el cuál instalará todas las dependencias necesarias.

Después de instalar todas las dependencias, podemos empaquetar el código en modo producción o desarrollo usando los comandos:

* `npm run dev` para probar en modo desarrollo.

* `npm run build` para empaquetar en modo producción en la carpeta 'dist'.

* `npm run preview` para probar la build en modo local (es necesario ejecutar después del comando anterior).

Los diferentes scripts que se pueden usar están en el archivo package.json


## Dependencias utilizadas

Para instalar las dependencias de forma separada (si no se usa el comando `npm install`), es necesario ejecutar los siguientes comandos:

* `npm i @aws-sdk/client-cognito-identity-provider`

* `npm i @aws-sdk/credential-provider-cognito-identity`

* `npm i @aws-sdk/client-dynamodb`

* `npm i @aws-sdk/client-s3`

* `npm i qrcode`

* `npm i vite`


Creación del proyecto con Vite:

* `npm create vite@latest` para crear un proyecto con la última versión de Vite.

* Luego tenemos que ejecutar  `"npm install"` (o `"npm i"`) para instalar las dependencias necesarias.

## Referencias

- [AWS SDK de Javascript versión 3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/) - Guía inicio del SDK de Javascript versión 3 de AWS. Podremos ver cómo instalar módulos, configuración, referencias y mucho más.

- [AWS SDK de Javascript versión 3 (parte Cognito User Pools)](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/preview/Package/-aws-sdk-client-cognito-identity-provider/) - Documentación AWS SDK versión 3 parte Cognito User Pools.

- [AWS SDK de Javascript versión 3 (parte Cognito Identity Pools)](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/preview/Package/-aws-sdk-client-cognito-identity/) - Documentación AWS SDK versión 3 parte Cognito Identity Pools. 

- [Guía para desarrolladores de AWS Cognito](https://docs.aws.amazon.com/es_es/cognito/latest/developerguide/what-is-amazon-cognito.html) - Documentación guía para desarrolladores Cognito.
  
- [Guía AWS SDK Javascript versión 3 (parte de Cognito User Pools, documentación antigua)](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-cognito-identity-provider) - Aquí tenemos una guía de las funciones que podemos usar de Cognito, pero en la documentación antigua.





