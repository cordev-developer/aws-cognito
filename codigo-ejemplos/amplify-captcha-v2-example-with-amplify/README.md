# Autenticación con Cognito y Google ReCaptcha, usando React (subiendo el proyecto a AWS Amplify) 

Veremos en este ejemplo cómo podemos aumentar la seguridad de nuestras aplicaciones añadiendo el mecanismo de seguridad de Google ReCaptcha. También veremos cómo usar los flujos personalizados o custom flows con triggers lambda, usando los métodos para hacer signin y confirmar signin por parte de los usuarios. Muy interesante cómo usaremos los triggers o funciones lambda con el custom flow para comprobar que el usuario ha resuelto correctamente el ReCaptcha.

En este ejemplo sí que usaremos la Amplify CLI, para para ver por ejemplo cómo subir el proyecto a Amplify, añadir el módulo de autenticación, hacer push del proyecto, etc. Finalmente, veremos cómo eliminar los recursos creados, tanto a nivel local como el proyecto subido al servicio de Amplify. 

El proyecto incluye un archivo llamado `aws-exports-example` que deberemos renombrar y es donde configuraremos nuestros grupos de usuarios para probar los ejemplos de código.

## Tecnologías 

* Node y npm
* Vite
* React versión 18
* ES6
* Librería de AWS Amplify
* User Pools de Cognito
* Google ReCaptcha versión 2

## Cómo ejecutar el código

Para ejecutar el código de forma sencilla, debemos situarnos en la carpeta del proyecto y utilizar el comando `npm install`, el cuál instalará todas las dependencias necesarias.

Después de instalar todas las dependencias, podemos ejecutar el código en modo producción o ejecutarlo en modo desarrollo usando los comandos:

Para ejecutar en modo desarrollo:
* `npm run dev`   

Para ejecutar en modo producción (creará la carpeta `dist`):
* `npm run build`   

<br/>
Los diferentes scripts que se pueden usar están en el archivo package.json

## Algunas dependencias relevantes 

Para instalar las dependencias de forma separada (si no se usa el comando `npm install`), es necesario ejecutar los siguientes comandos de npm (sólo están incluidas las dependencias más destacadas):

Librería de AWS Amplify:

* `npm i aws-amplify`  

Módulo autenticación Amplify:

* `npm i @aws-amplify/auth` 

Módulo UI React de Amplify:

* `npm i @aws-amplify/ui-react`


## Referencias

- [Documentación Amplify Flujos de autenticación](https://docs.amplify.aws/react/build-a-backend/auth/switch-auth/) - Documentación oficial de AWS Amplify donde podemos ver los Custom Flows o Flujos personalizados.

- [Diagrama Custom Flow con Triggers Lambda](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-challenge.html) - Documentación oficial de AWS sobre Cognito dónde podremos observar con detalle todo el flujo que se produce con los triggers lambda utilizando el custom flow.

- [Documentación Google ReCaptcha versión 2](https://developers.google.com/recaptcha/docs/display?hl=es-419) - Documentación oficial de Google sobre cómo usar la versión 2 de ReCaptcha.

- [Página principal del servicio AWS Amplify en Español](https://aws.amazon.com/es/amplify) - Documentación oficial, características, precios, etc., del servicio de AWS Amplify.
