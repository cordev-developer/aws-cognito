# Ejemplo 2 social loguin mediante Google, Facebook (Meta), Amazon, etc.,  con Cognito, Amplify y React

Ejemplo muy parecido al ejemplo 1, pero en este caso usando sin usar el componenete "Authenticator" e implementando nosotros mismos la autenticación. Podremos autenticarnos a través de Amazon, Google,  Facebook (y ampliable a más) y mediante la Hosted UI de Cognito. Además podremos controlar el estado de esa autenticación y añadir código adicional cuando se produzcan los diferentes eventos por los que pasa la autenticación. También veremos que podemos pasar atributos customizados cunado usamos la Hosted UI.


## Tecnologías 

* Node y npm
* Vite
* React
* ES6
* Librería de AWS Amplify
* User Pools de AWS Cognito


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

- [Guía para desarrolladores de AWS Cognito](https://docs.aws.amazon.com/es_es/cognito/latest/developerguide/what-is-amazon-cognito.html) - Guía para desarrolladores Cognito.

- [Página principal del servicio AWS Amplify en Español](https://aws.amazon.com/es/amplify) - Documentación oficial, características, precios, etc., del servicio de AWS Amplify.
