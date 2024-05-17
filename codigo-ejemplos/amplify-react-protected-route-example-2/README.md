# Autenticación en Cognito, usando React y rutas protegidas ejemplo 2

Este proyecto nos muestra cómo podemos hacer un sistema de rutas básicas dependiendo del grupo al que pertenezcan nuestros usuarios. En este caso, asumiremos que si el usuario no pertenece a ningún grupo, entonces es que pertenece al grupo 'user', dónde tendremos una ruta que será básica y que mostrará de forma pública la ruta y el componente 'UserPage'. La ruta del componente 'AdminPage' si que necesitará que el usuario pertenezca al grupo 'admin', es decir, tendremos que crear este grupo en Cognito User Pools y asignarlo a los usuarios que nos interesen. Es un ejemplo básico dónde vamos a utilizar un hook que nos proporciona Amplify para acceder a información de la sesión y/o de si el usuario está o no autenticado. 

En este ejemplo, vamos a utilizar las herramientas que nos proporciona Amplify para acceder a los datos de autenticación, sesión, etc. y validar las rutas de una forma sencilla. En el ejemplo siguiente (el ejemplo número 3 de rutas protegidas) utilizaremos los Providers por ejemplo para manejar el contexto de la aplicación, dónde almacenaremos y gestionaremos el estado de nuestra aplicación. Será un ejemplo más avanazado, pero igualmente parecido a este ejemplo número 2.

En este caso, veremos también cómo acceder a los tokens, en concreto al token de acceso, dónde se guarda información como los grupos a los que pertenece el usuario, el user name, etc.

El proyecto incluye un archivo llamado `aws-exports-example` que deberemos renombrar y es donde configuraremos nuestros grupos de usuarios para probar los ejemplos de código.

## Tecnologías 

* Node y npm
* Vite
* React versión 18
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


## Referencias

- [AWS Amplify Library for React](https://docs.amplify.aws/react/how-amplify-works) - Documentación oficial de AWS sobre Amplify para varias plataformas (React, Javascript, Next, Flutter, etc.), en nuestro caso usaremos React.

 - [AWS Amplify UI Library for React](https://ui.docs.amplify.aws/react/connected-components/authenticator) - Documentación oficial de AWS sobre la UI de Amplify para varias plataformas (React, Javascript, Next, Flutter, etc.), en nuestro caso usaremos React. En este caso configuraremos Amplify en nuestro proyecto para usar el componente 'Authenticator'.

- [Guía para desarrolladores de AWS Cognito](https://docs.aws.amazon.com/es_es/cognito/latest/developerguide/what-is-amazon-cognito.html) - Guía para desarrolladores Cognito.

- [Página principal del servicio AWS Amplify en Español](https://aws.amazon.com/es/amplify) - Documentación oficial, características, precios, etc., del servicio de AWS Amplify.
