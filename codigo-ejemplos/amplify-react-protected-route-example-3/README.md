# Autenticación en Cognito, usando React y rutas protegidas ejemplo 3

Este proyecto incluye un ejemplo de una pequeña aplicación utilizando AWS Amplify y usando React para interactuar y comunicarnos con AWS Cognito. El ejemplo consiste en una página web muy sencilla (no es responsive, etc.) únicamente con la finalidad de probar los ejemplos mediante la UI y la consola de desarrolladores, dónde podremos ver los resultados de ejecutar las funciones. Veremos cómo manejar un poco las rutas de la aplicación y el módulo de autenticación que nos facilita Amplify y que se encarga de la UI para hacer loguin o registro.

El ejemplo va a disponer de diferentes opciones para hacer loguin de usuarios, por ejemplo rutas para usuarios según el grupo al que pertenezcan, que en nuestro caso vamos a crear un grupo llamado 'user' y otro llamado 'admin'. Estos grupos los crearemos en Cognito mediante el User Pool que se nos asigne al proyecto, es decir, registraremos un usuario (o más), crearemos estos dos grupos y podremos añadir este o estos usuarios a los dos grupos o a uno de ellos, etc. De esta forma controlaremos en nuestra aplicación en React, qué usuarios pueden acceder a las rutas creadas para estos dos usuarios.

El ejemplo nos puede servir también para crear más rutas y añadir más grupos por si queremos ampliar nuestra aplicación según nuestras necesidades. Finalmente veremos también cómo usar el useContext para crear un provider en React, que nos sirva para manejar el estado de nuestra aplicación. También podremos acceder al token de acceso dónde está integrada esta información, es decir, los grupos a los que pertenece el usuario, también acceder al user name o podemos personalizar qué información necesitamos obtener del token de acceso. Además, si queremos podremos acceder al token de identificación por si queremos utilizar también la información que contiene.

En definitiva, se trata de un ejemplo muy parecido al ejemplo 2 de rutas protegidas, pero un poco más avanzado en el sentido de que tendremos un Context Provider y usaremos también el Provider que nos ofrece Amplify para integrar el módulo de autenticación en nuestras aplicaciones.

## Tecnologías 

* Node y npm
* Vite
* React versión 18
* ES6
* Librería de AWS Amplify
* Amplify CLI
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

- [AWS Amplify Library for React, setup CLI](https://docs.amplify.aws/react/start/getting-started/installation) - Documentación oficial de AWS sobre Amplify para instalar la CLI de Amplify.


- [AWS Amplify Library for React](https://docs.amplify.aws/react/build-a-backend/auth/set-up-auth) - Documentación oficial de AWS sobre Amplify para varias plataformas (React, Javascript, Next, Flutter, etc.), en nuestro caso usaremos React. En este caso configuraremos Amplify en nuestro ejemplo 3.

- [AWS Amplify UI Library for React](https://ui.docs.amplify.aws/react/connected-components/authenticator) - Documentación oficial de AWS sobre la UI de Amplify para varias plataformas (React, Javascript, Next, Flutter, etc.), en nuestro caso usaremos React. En este caso configuraremos Amplify en nuestro proyecto para usar el componente 'Authenticator'.

- [Guía para desarrolladores de AWS Cognito](https://docs.aws.amazon.com/es_es/cognito/latest/developerguide/what-is-amazon-cognito.html) - Guía para desarrolladores Cognito.

- [Página principal del servicio AWS Amplify en Español](https://aws.amazon.com/es/amplify) - Documentación oficial, características, precios, etc.
