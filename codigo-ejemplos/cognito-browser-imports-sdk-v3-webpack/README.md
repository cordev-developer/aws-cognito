# Cognito con SDK Javascript versión 3 (con imports y Webpack)

En este proyecto se muestra cómo usar el SDK de Javacript de Cognito en su versión 3. También se utiliza la importación de módulos propia de ES6 (usando "import") en lugar de usar la sintaxis de CommonJS, que usa "require".

El código está configurado para usar Webpack com bundler o empaquetador, permitiendo así obtener los ficheros resultantes de la distribución en la carpeta "dist" (de distribution), dónde se obtienen los ficheros html, css y javascript resultantes. 

Entre las dependencias destacadas utilizadas, se usa babel como transpilador para poder ejecutar el código en todos los navegadores.

En este caso, no se incluye algunos métodos ni el ejemplo de autenticación mediante TOTP (códigos QR etc.). 

Específicamente, se ha implementado este repositorio para ver que también se puede usar Webpack como empaquetador o bundler.

## Tecnologías 

* Node y npm
* Webpack y ES6
* Amazon Cognito Identity SDK para Javascript

## Cómo ejecutar el código

Para ejecutar el código de forma sencilla, debemos situarnos en la carpeta del proyecto y utilizar el comando `npm install`, el cuál instalará todas las dependencias necesarias.

Después de instalar todas las dependencias, podemos empaquetar el código en modo producción o desarrollo usando los comandos:

* `npm run dev` para empaquetar en modo desarrollo.

* `npm run build` para empaquetar en modo producción.

* `npm run start` para ejecutar en modo desarrollo usando el servidor de desarrollo. En este caso se abrirá también una ventana del navegador dónde podremos ver el resultado realizar cambios en modo hot module replacement (cambios en caliente).

Los diferentes scripts que se pueden usar están en el archivo package.json

## Dependencias utilizadas

Para instalar las dependencias de forma separada (si no se usa el comando `npm install`), es necesario ejecutar los siguientes comandos de npm:

* `npm install @aws-sdk/client-cognito-identity-provider`

* `npm install webpack webpack-cli -D`

* `npm install babel-loader @babel/core @babel/preset-env -D`

* `npm install @babel/plugin-transform-runtime -D`

* `npm install webpack-dev-server -D`

* `npm install html-webpack-plugin -D`

* `npm install copy-web-plugin -D`

## Referencias

- [AWS SDK de Javascript versión 3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/) - Guía inicio del SDK de Javascript versión 3 de AWS. Podremos ver cómo instalar módulos, configuración, referencias y mucho más.

- [AWS SDK de Javascript versión 3 (parte Cognito User Pools)](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/preview/Package/-aws-sdk-client-cognito-identity-provider/) - Documentación AWS SDK versión 3 parte Cognito User Pools.

- [AWS SDK de Javascript versión 3 (parte Cognito Identity Pools)](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/preview/Package/-aws-sdk-client-cognito-identity/) - Documentación AWS SDK versión 3 parte Cognito Identity Pools. 

- [Guía AWS SDK Javascript versión 3 (parte de Cognito, documentación antigua)](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-cognito-identity-provider) - Aquí tenemos una guía de las funciones que podemos usar de Cognito, pero en la documentación antigua.





