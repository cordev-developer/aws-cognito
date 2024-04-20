# Trigger lambda prerregistro con Cognito (Ejemplo 4)

Ejemplo 4 de trigger o desencadenador lambda de prerregistro (utilizando sintaxis de módulos y Node 18).


## Tecnologías 

* Funciones Lambda de AWS con Cognito


## Cómo ejecutar el código

Para ejecutar el código, sólo debemos cargar el fichero de la función lambda ("index.mjs") y configurar correctamente el trigger lambda de Cognito (trigger prerregistro).
En esta ocasión veremos una función lambda que comprueba si el email del usuario ya está en uso por otro usuario, devolviendo un error si es el caso.

Se incluye también el fichero con la política de permisos adicional para permitir a la función lambda listar usuarios de Cognito. En este
caso teneis que especificar vuestro Account ID de vuestra cuenta de AWS dónde está indicado en la política.


## Referencias

- [AWS SDK de Javascript versión 3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/) - Guía inicio del SDK de Javascript versión 3 de AWS. Podremos ver cómo instalar módulos, configuración, referencias y mucho más.

- [Guía AWS SDK Javascript v3 (parte de Cognito)](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-cognito-identity-provider) - Aquí tenemos una guía de las funciones que podemos usar de Cognito.

- [Guía documentación AWS SDK Javascript v3, versión nueva (no está completa)](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/preview/client/cognito-identity-provider) - Es una versión nueva de la documentació oficial de la versión 3 del SDK de Javascript, pero OJO !! no está todavía terminada, por lo que no están incluidas todas las funcionalidades.



