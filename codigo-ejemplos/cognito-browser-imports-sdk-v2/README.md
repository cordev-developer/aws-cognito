# Cognito con SDK Javascript versión 2 (imports)

En este proyecto se muestra cómo usar el SDK de Javacript de Cognito en su versión 2, usando principalmente callbacks. También se utiliza la importación de módulos propia de ES6 (usando "import") en lugar de usar la sintaxis de CommonJS, que usa "require".

El código está configurado para usar Webpack com bundler o empaquetador, permitiendo así obtener los ficheros resultantes de la distribución en la carpeta "dist" (de distribution), dónde se obtienen los ficheros html, css y javascript resultantes. 

Entre las dependencias destacadas utilizadas, se usa babel como transpilador para poder ejecutar el código en todos los navegadores.

## Tecnologías 

* Node y npm
* Webpack y ES6
* Amazon Cognito Identity SDK para Javascript

## Cómo ejecutar el código

Para ejecutar el código de forma sencilla, debemos situarnos en la carpeta del proyecto y utilizar el comando `npm install`, el cuál instalará todas las dependencias necesarias.

Después de instalar todas las dependencias, podemos empaquetar el código en modo producción o desarrollo usando los comandos:

* `npm run dev` para empaquetar en modo desarrollo.

* `npm run build` para empaquetar en modo producción.

* `npm run start` para ejecutar en modo desarrollo usando el servidor de desarrollo. En este caso se abrirá también una ventana del navegador dónde podremos ver el resultado realizar cambios en modo hot reload.

Los diferentes scripts que se pueden usar están en el archivo package.json

## Dependencias utilizadas

Para instalar las dependencias de forma separada (si no se usa el comando `npm install`), es necesario ejecutar los siguientes comandos de npm:

* `npm install --save amazon-cognito-identity-js`

* `npm install --save aws-sdk`

* `npm install webpack webpack-cli -D`

* `npm install babel-loader @babel/core @babel/preset-env -D`

* `npm install @babel/plugin-transform-runtime -D`

* `npm install webpack-dev-server -D`

* `npm install html-webpack-plugin -D`

* `npm install copy-web-plugin -D`

## Referencias

- [AWS SDK de Javascript versión 2](https://github.com/aws-amplify/amplify-js/tree/master/packages/amazon-cognito-identity-js) - Muy interesante el archivo Readme.md dónde se muestran muchos ejemplos.

- [Guía para desarrolladores. Documentación AWS SDK Javascript v2](https://docs.aws.amazon.com/es_es/sdk-for-javascript/v2/developer-guide/webpack.html) - Aquí se muestra cómo empezar con el SDK, cómo usar Webpack con ES6 o Node.js, etc.

- [Paquetes modulares AWS SDK Javascript](https://aws.amazon.com/es/blogs/developer/modular-packages-in-aws-sdk-for-javascript/) - Se muestra cómo podemos cargar únicamente los módulos que necesitemos, también algunas diferencias respecto del SDK de Javascript versión 3.


