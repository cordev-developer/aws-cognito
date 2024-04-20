# Cognito con SDK Javascript versión 2 (target: node)

En este proyecto se muestra cómo usar el SDK de Javacript de Cognito en su versión 2, usando principalmente callbacks. También se utiliza la importación de módulos propia de ES6 (usando "import") en lugar de usar la sintaxis de CommonJS, que usa "require".

El código está configurado para usar Webpack com bundler o empaquetador, permitiendo así obtener los ficheros resultantes de la distribución en la carpeta "dist" (de distribution).

## Tecnologías 

* Node y npm
* Webpack y ES6
* Amazon Cognito Identity SDK para Javascript

## Cómo ejecutar el código

Para ejecutar el código de forma sencilla, debemos situarnos en la carpeta del proyecto y utilizar el comando `npm install`, el cuál instalará todas las dependencias necesarias.

Después de instalar todas las dependencias, podemos empaquetar el código en modo producción o desarrollo usando los comandos:

* `npm run dev` para ejecutar en modo desarrollo.

* `npm run build` para modo producción.

Los diferentes scripts que se pueden usar están en el archivo package.json

Finalmente, para ejecutar el fichero empaquetado podemos usar:

* `node bundle.js` desde la carpeta "dist"

## Dependencias utilizadas

Para instalar las dependencias de forma separada (si no se usa el comando `npm install`), es necesario ejecutar los siguientes comandos de npm:

* `npm install --save amazon-cognito-identity-js`

* `npm install --save aws-sdk`

* `npm install readline-sync -D`

* `npm install webpack webpack-cli -D`


## Referencias

- [AWS SDK de Javascript versión 2](https://github.com/aws-amplify/amplify-js/tree/master/packages/amazon-cognito-identity-js) - Muy interesante el archivo Readme.md dónde se muestran muchos ejemplos.

- [Guía desarrolladores documentación AWS SDK Javascript v2](https://docs.aws.amazon.com/es_es/sdk-for-javascript/v2/developer-guide/webpack.html) - Aquí se muestra cómo cómo empezar con el SDK, cómo usar Webpack con ES6 o Node.js, etc.

- [Paquetes modulares AWS SDK Javascript](https://aws.amazon.com/es/blogs/developer/modular-packages-in-aws-sdk-for-javascript/) - Se muestran cómo podemos cargar únicamente los módulos que necesitemos. También se muestran algunas diferencias respecto del SDK de Javascript versión 3.


