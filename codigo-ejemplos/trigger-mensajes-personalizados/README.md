# Trigger lambda personalización mensajes

Ejemplo de trigger o desencadenador lambda para personalizar mensaje de confirmación de cuenta del usuario.


## Tecnologías 

* Funciones Lambda de AWS con Cognito


## Cómo ejecutar el código

Para ejecutar el código, sólo debemos cargar el fichero de la función lambda ("index.mjs") y configurar correctamente el trigger lambda de Cognito (trigger personalización mensajes).
En este ejemplo veremos cómo podemos personalizar las plantillas de los mensajes que puede enviar Cognito a los usuarios. En este caso modificamos la plantilla del mensaje de confirmación de cuenta (dónde se envía el código de verificación). También podemos personalizar otros mensajes, cómo el de reenvió de código, enviar la contraseña temporal, etc., hay varios ejemplos que podemos personalizar.


## Referencias

- [AWS SDK de Javascript versión 2](https://github.com/aws-amplify/amplify-js/tree/master/packages/amazon-cognito-identity-js) - Muy interesante el archivo Readme.md dónde se muestran muchos ejemplos.

- [AWS SDK de Javascript versión 3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/) - Guía para desarrolladores, ejemplos, herramientas y operaciones de API.

- [Guía desarrolladores documentación AWS SDK Javascript v2](https://docs.aws.amazon.com/es_es/sdk-for-javascript/v2/developer-guide/webpack.html) - Aquí se muestra cómo empezar con el SDK, cómo usar Webpack con ES6 o Node.js, etc.



