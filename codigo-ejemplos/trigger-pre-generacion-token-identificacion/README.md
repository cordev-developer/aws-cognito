# Trigger lambda pre-generación token

Ejemplo de trigger o desencadenador lambda de pre-generación de token de identificación.


## Tecnologías 

* Funciones Lambda de AWS con Cognito


## Cómo ejecutar el código

Para ejecutar el código, sólo debemos cargar el fichero de la función lambda ("index.mjs") y configurar correctamente el trigger lambda de Cognito (trigger pregeneración token).
En este ejemplo veremos cómo podemos cambiar algunos atributos o claims del token de identificación antes de que Cognito lo devuelva al usuario o aplicación.


## Referencias

- [Guida desarrolladores Amazon Cognito](https://docs.aws.amazon.com/es_es/cognito/latest/developerguide/user-pool-lambda-pre-token-generation.html) - Información sobre los triggers lambda de pre-generación de tokens de identificación y acceso.




