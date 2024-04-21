# Trigger lambda pre-autenticación

Ejemplo de trigger o desencadenador lambda pre-autenticación.


## Tecnologías 

* Funciones Lambda de AWS con Cognito


## Cómo ejecutar el código

Para ejecutar el código, sólo debemos cargar el fichero de la función lambda ("index.mjs") y configurar correctamente el trigger lambda de Cognito (trigger pre-autenticación/signin).
En este ejemplo veremos cómo podemos bloquear el acceso a un determinado cliente de aplicación (app client) especificando el app client id.


## Referencias

- [AWS SDK de Javascript versión 2](https://github.com/aws-amplify/amplify-js/tree/master/packages/amazon-cognito-identity-js) - Muy interesante el archivo Readme.md dónde se muestran muchos ejemplos.

- [Guía desarrolladores documentación AWS SDK Javascript v2](https://docs.aws.amazon.com/es_es/sdk-for-javascript/v2/developer-guide/webpack.html) - Aquí se muestra cómo empezar con el SDK, cómo usar Webpack con ES6 o Node.js, etc.



