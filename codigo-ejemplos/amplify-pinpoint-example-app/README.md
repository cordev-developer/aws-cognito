# Utilizando Pinpoint Analytics y Cognito para crear datos de analítica

En este ejemplo podemos ver cómo configurar un proyecto para utilizar el módulo de autenticación y de analítica de AWS Amplify. El ejemplo se centra en el uso de Pinpoint Analytics. Podremos observar un ejemplo muy interesante dónde podemos añadir datos analíticos a nuestras aplicaciones, para posteriormente observar estadísticas sobre estos datos en la consola de AWS Pinpoint Analytics. También vamos a ver cómo podemos crear campañas para por ejemplo enviar emails a nuestros usuarios cuando de produzcan ciertos eventos definidos previamente. 

Es importante destacar que una vez nuestra aplicación se ejecuta y se generan los eventos por primera vez, estos tardarán todavía un mínimo de 0:30h a 1:00h en llegar los eventos a la consola de AWS Pinpoint. Una vez transcurrido este tiempo, ya podremos activar por ejemplo enviar los emails de forma inmediata cuando se produzca el evento programado. Para enviar los emails a los usuarios autenticados también usaremos el servicio de AWS SES (Simple Email Service), por lo que será requerido tener una dirección de correo verificada en este servicio, ya que esta dirección aparecerá como remitente en los correos recibidos. 

La aplicación también usa el módulo de autenticación de Cognito, de manera que podremos enviar emails personalizados a los diferentes usuarios registrados en nuestro User Pool de Cognito (cada uno con su dirección de correo). Los emails/correos se enviarán en respuesta a cierto tipo de eventos que programados en nuestra aplicación, los cualés también podremos personalizar según nuestras necesidades.

## Tecnologías 

* Node y npm
* Vite
* React
* ES6
* AWS Amplify (y su CLI)
* AWS Pinpoint Analytics
* AWS SES (Simple Email Service)
* User Pools e Identity Pools de AWS Cognito

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

Librería de AWS Amplify versión 5:

* `npm install aws-amplify@^5`  

Módulo UI React de Amplify versión 5:

* `npm i @aws-amplify/ui-react@^5`


## Referencias

- [Documentación oficial AWS Pinpoint](https://aws.amazon.com/es/pinpoint/) - Documentación oficial AWS servicio de Amazon Pinpoint (precios, características, recursos, preguntas frecuentes, etc.).

- [Documentación oficial Amplify parte Analytics](https://docs.amplify.aws/javascript/prev/build-a-backend/more-features/analytics/) - Documentación oficial módulo Analytics de AWS Amplify.

- [Documentación Amplify instalación Amplify CLI](https://docs.amplify.aws/javascript/tools/cli/start/set-up-cli/) - Documentación oficial sobre cómo instalar la Amplify CLI (es igual en las versiones 5 y 6 de Javascript).
