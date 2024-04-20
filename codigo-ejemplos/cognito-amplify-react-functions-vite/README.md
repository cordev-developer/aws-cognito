# Autenticación en Cognito, usando React y funciones de la librería AWS Amplify

Este proyecto incluye varios ejemplos de funciones de AWS Amplify usando React para interactuar y comunicarnos con AWS Cognito. El ejemplo consiste en una página web muy sencilla (no es responsive, etc.) únicamente con la finalidad de probar los ejemplos mediante la UI y la consola de desarrolladores, dónde podremos ver los resultados de ejecutar las funciones.

Algunas funciones interesantes incluyen: registro, login y logout, recuperar password, trackear dispositivos a través del protocolo SRP (tiene que estar activado en nuestro grupo de usuarios), así como gestionar TOTP (Time Based One Time Password o contraseñas de un sólo uso basadas en el tiempo) para usar el MFA (Multifactor Authentication).

El proyecto incluye un archivo llamado `aws-exports` donde configuraremos nuestros grupos de usuarios para probar los ejemplos de código, ya que necesitaremos grupos de usuarios o User Pools que usen o no MFA, así cómo otros que usen TOTP, etc.


## Tecnologías 

* Node y npm
* Vite
* React
* ES6
* Librería de AWS Amplify
* User Pools e Identity Pools de AWS Cognito

## Cómo ejecutar el código

Para ejecutar el código de forma sencilla, debemos situarnos en la carpeta del proyecto y utilizar el comando `npm install`, el cuál instalará todas las dependencias necesarias.

Después de instalar todas las dependencias, podemos ejecutar el código en modo producción o ejecutarlo en modo desarrollo usando los comandos:

Para ejecutar en modo desarrollo:
* `npm run dev`   

Para ejecutar en modo producción (creará la carpeta `dist`):
* `npm run build`   preparar ejecutables para modo producción.

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

Para usar códigos QR y TOTP (Time Based One Time Password):

* `npm i qrcode.react`  

Para usar formularios e inputs:

* `npm i react-hook-form`

## Referencias

- [AWS Amplify Library for React](https://docs.amplify.aws/react/how-amplify-works) - Documentación oficial de AWS sobre Amplify para varias plataformas (React, Javascript, Next, Flutter, etc.), en nuestro caso usaremos React.

- [Guía para desarrolladores de AWS Cognito](https://docs.aws.amazon.com/es_es/cognito/latest/developerguide/what-is-amazon-cognito.html) - Guía para desarrolladores Cognito.

- [Página principal del servicio AWS Amplify en Español](https://aws.amazon.com/es/amplify) - Documentación oficial, características, precios, etc., del servicio de AWS Amplify.
