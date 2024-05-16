# Trigger lambda pre-generación token de acceso

Ejemplo de trigger o desencadenador lambda de pre-generación de token de acceso.


## Tecnologías 

* Funciones Lambda de AWS con Cognito


## Cómo ejecutar el código

Para ejecutar el código, sólo debemos cargar el fichero de la función lambda ("index.mjs") y configurar correctamente el trigger lambda de Cognito (trigger pregeneración token acceso).
En este ejemplo veremos cómo podemos cambiar algunos atributos o claims, scopes o permisos, etc. del token de acceso, antes de que Cognito lo devuelva al usuario o aplicación.


## Referencias

- [Guia desarrolladores Amazon Cognito](https://docs.aws.amazon.com/es_es/cognito/latest/developerguide/user-pool-lambda-pre-token-generation.html) - Información sobre los triggers lambda de pre-generación de tokens de identificación y acceso.

- [Artículo Blog AWS, sobre cómo personalizar tokens de acceso](https://aws.amazon.com/es/blogs/security/how-to-customize-access-tokens-in-amazon-cognito-user-pools/) - Artíuclo en inglés muy interesante sobre cómo podemos personalizar los tokens de acceso mediante un trigger lambda. También hay código de ejemplo.




