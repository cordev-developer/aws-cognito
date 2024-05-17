# Autenticación en Cognito, usando React y rutas protegidas ejemplo 1

Este proyecto incluye varios ejemplos de funciones de AWS Amplify usando React para interactuar y comunicarnos con AWS Cognito. El ejemplo consiste en una página web muy sencilla (no es responsive, etc.) únicamente con la finalidad de probar los ejemplos mediante la UI y la consola de desarrolladores, dónde podremos ver los resultados de ejecutar las funciones.

Este ejemplo número 1 de rutas protegidas, incluirá una ruta pública y otra ruta protegida, y es en esta última dónde agregaremos el módulo 'Authenticator' de Amplify para proteger esa ruta y sólo permitir acceso a los usuarios autenticados. Es un ejemplo sencillo ideal para comenzar a practicar con el módulo de autenticación.

Veremos también cómo acceder a los tokens, en concreto al token de acceso, dónde se guarda información como los grupos a los que pertenece el usuario, el user name, etc., en definitiva obtendremos los conocimientos necesarios para acceder a los claims o atributos de los tokens de acceso e identificación. De manera que aunque no utilicemos directamente el token de identificación, podremos adaptar el ejemplo para que así sea, y aprender cómo acceder a estos claims o atributos de los tokens.

El proyecto incluye un archivo llamado `aws-exports-example` que deberemos renombrar y es donde configuraremos nuestros grupos de usuarios para probar los ejemplos de código.

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


## Referencias

- [AWS Amplify Library for React](https://docs.amplify.aws/gen1/react/how-amplify-works/) - Documentación oficial de AWS sobre Amplify para varias plataformas (React, Javascript, Next, Flutter, etc.), en nuestro caso usaremos React.

- [AWS Amplify UI Library for React](https://ui.docs.amplify.aws/react/connected-components/authenticator) - Documentación oficial de AWS sobre la UI de Amplify para varias plataformas (React, Javascript, Next, Flutter, etc.), en nuestro caso usaremos React. En este caso configuraremos Amplify en nuestro proyecto para usar el componente 'Authenticator'.

- [AWS Amplify Library for React, setup CLI](https://docs.amplify.aws/react/start/getting-started/installation) - Documentación oficial de AWS sobre Amplify para instalar la CLI de Amplify.

- [Guía para desarrolladores de AWS Cognito](https://docs.aws.amazon.com/es_es/cognito/latest/developerguide/what-is-amazon-cognito.html) - Guía para desarrolladores Cognito.

- [Página principal del servicio AWS Amplify en Español](https://aws.amazon.com/es/amplify) - Documentación oficial, características, precios, etc., del servicio de AWS Amplify.
