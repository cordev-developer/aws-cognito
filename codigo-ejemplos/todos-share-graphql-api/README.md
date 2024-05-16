# Ejemplo 2 con AppSync, graphQL, React y Amplify (todos o tareas compartidas con otros usuarios)

Otro ejemplo de todos o tareas muy parecido al ejemplo 1, pero en este caso vamos a poder compartir esos todos con otros usuarios. De manera que si tenemos dos usuarios diferentes autenticados, por ejemplo en dos ventanas diferentes del navegador (una ventana de incógnito y otro normal con dos usuarios autenticados diferentes), podremos intercambiar esos todos con otros usuarios. Para el intercambio vamos a utilizar una propiedad muy interesante definida en el esquema (schema) que nos permite que un todo pueda 
pertenecer a varios usuarios al mismo tiempo, entonces cuando compartimos el todo especificamos el otro usuario y le aparecerá ese todo compartido en tiempo real.

## Tenologias

* AWS Amplify
* React
* AWS AppSync
* GraphQL

## Referencias

- [Página servicio principal AWS AppSync](https://aws.amazon.com/es/appsync/resources/) - Guía servicio AppSync sobre los recursos que disponemos para desarrolladores (documentación, guías, tutoriales, blogs, etc.), características, precios, etc.

- [Documentación AWS Amplify con GraphQL y AppSync](https://docs.amplify.aws/gen1/react/build-a-backend/graphqlapi/set-up-graphql-api/) - Artíuclo en inglés muy interesante sobre cómo podemos personalizar los tokens de acceso mediante un trigger lambda. También hay código de ejemplo.
