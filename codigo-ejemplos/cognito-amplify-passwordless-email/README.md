# Ejemplo Cognito passwordless con email usando Amplify y React

En este ejemplo podremos ver cómo implementar la autenticación de usuarios en Cognito sin necesidad de usar el password, sino que usaremos un código secreto enviado al email del usuario. Para ello necesitaremos registrar nuestros usuarios con su nombre de usuario (user name) y un email válido. Nuestro código usará triggers lambda para implementar el flujo personalizado y verificar que el código secreto enviado al email del usuario es correcto, y entonces daremos por buena la autenticación.
Para que funcione todo correctamente, necesitaremos definir el código de nuestras funciones lambda y asignarlas a nuestro grupo de usuarios o User Pool de Cognito.

También usaremos el servicio SES (Simple Email Service) para enviar el código de confirmación mediante una función lambda que envia un código secreto por email al usuario. Por tanto será necesario asignar permisos adicionales a la función lambda que envia el email usando el servicio SES. Recordad que hay una sección en el curso sobre cómo usar y configurar el servicio SES, dónde simplemente no necesitamos tampoco usar en modo producción, sino que usaremos una dirección e email (por ejemplo nuestro correo de gmail) verificada desde dónde se puedan enviar los correos.

## Tecnologías 

* Node y npm
* Vite
* React versión 18
* ES6
* Librería de AWS Amplify
* Cognito User Pools 
* Servicio SES (Simple Email Service) de AWS

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


Módulo autenticación Amplify:

* `npm i @aws-amplify/auth` 


## Referencias

- [Artículo AWS implementación custom flow con passwordless email](https://aws.amazon.com/es/blogs/mobile/implementing-passwordless-email-authentication-with-amazon-cognito) - Artículo AWS sobre implementación del flujo personalizado e implementación de un ejemplo de autenticación sin password enviando un código secreto al email del usuario.

- [Documentación AWS Guía Desarrolladores Cognito. Custom Auth Flow o flujo personalizado](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-challenge.html) - Documentación oficial de AWS Cognito (Guía desarrolladores) dónde podemos ver el flujo personalizado o custom flow.

- [Documentación AWS Amplify sobre cómo usar el flujo "CUSTOM_WITHOUT_SRP"](https://docs.amplify.aws/javascript/build-a-backend/auth/switch-auth) - Documentación oficial de AWS Amplify sobre cómo usar el flujo personalizado CUSTOM_WITHOUT_SRP que usaremos en el ejemplo.

- [Guía para desarrolladores de AWS Cognito](https://docs.aws.amazon.com/es_es/cognito/latest/developerguide/what-is-amazon-cognito.html) - Guía para desarrolladores Cognito.

- [Página principal del servicio AWS Amplify en Español](https://aws.amazon.com/es/amplify) - Documentación oficial, características, precios, etc.
