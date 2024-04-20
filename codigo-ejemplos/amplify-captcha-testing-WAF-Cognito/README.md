# Cognito y WAF (Web Application Firewall) 

Este es un pequeño proyecto que usaremos para probar una ACL Web con la regla de rate limit, definida en el servicio de AWS WAF. Esta ACL Web estará asociada a un grupo de usuarios o User Pool de Cognito, además tendrá definida una regla para evaluar el límite de peticiones (rate limit), de manera que mediante este pequeño ejemplo podremos lanzar peticiones a la API de Cognito para iniciar el proceso de autenticación o loguin, repitiendo la petición un número configurable de veces y observando cuando se bloquean las peticiones al alcanzar el número máximo permitido dentro de la regla definida en la ACL Web del servicio AWS WAF.


## Tecnologías 

* Node y npm
* Vite
* React
* ES6
* API de Cognito

## Cómo ejecutar el código

Para ejecutar el código de forma sencilla, debemos situarnos en la carpeta del proyecto y utilizar el comando `npm install`, el cuál instalará todas las dependencias necesarias.

Después de instalar todas las dependencias, podemos ejecutar el código en modo producción o ejecutarlo en modo desarrollo usando los comandos:

Para ejecutar en modo desarrollo:
* `npm run dev`   

Para ejecutar en modo producción (creará la carpeta `dist`):
* `npm run build` 

<br/>
Los diferentes scripts que se pueden usar están en el archivo package.json

## Referencias

- [Documentación AWS sobre WAF](https://aws.amazon.com/es/waf/) - Página principal servicio AWS WAF dónde podremos encontrar características, precios, recursos, etc.

- [Asociar una ACL Web a un grupo de usuarios o User Pool](https://docs.aws.amazon.com/es_es/cognito/latest/developerguide/user-pool-waf.html) - Documentación oficial AWS sobre cómo podemos asociar una ACL Web a un grupo de usuarios o User Pool de Cognito.

- [Información sobre qué es una lista de control de acceso (ACL Web)](https://docs.aws.amazon.com/es_es/waf/latest/developerguide/web-acl.html) - Documentación oficial sobre qué es una lista de control de acceso o ACL Web.

- [Ejemplo petición a Cognito para iniciar autenticación (la usaremos con la regla rate limit)](https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_InitiateAuth.html) - Documentación oficial API de Cognito User Pool, esta es la llamada a la API que usaremos para comprobar el rate limit definido en una ACL Web mediante una regla.

