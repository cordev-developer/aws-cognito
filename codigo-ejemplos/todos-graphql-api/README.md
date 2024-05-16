# Ejemplo 1 con AppSync, graphQL, React y Amplify (todos o tareas)

Ejemplo con graphQL y AppSync. En este ejemplo utilizamos una API en graphQL que nos permitirá gestionar tareas o "todos". Veremos cómo crear los todos, actualizarlos o eliminarlos. Usamos graphQL para el schema, suscripciones, mutaciones, consultas, etc.
Finalmente, dependiendo de lo que haga el usuario se pintará la UI en pantalla en tiempo real utilizando las suscripciones. Veremos también que a partir de un esquema base (o schema) podremos adaptar ese esquema para generar todas las consultas a la API de graphQL usando Amplify. Es un ejemplo sencillo que nos ilustra cómo interactuar con una API en graphQL y que además sólo cada usuario podrá cambiar, actualizar, etc.

## Tenologias

* AWS Amplify
* React
* AWS AppSync
* GraphQL

## Referencias

- [Página servicio principal AWS AppSync](https://aws.amazon.com/es/appsync/resources/) - Guía servicio AppSync sobre los recursos que disponemos para desarrolladores (documentación, guías, tutoriales, blogs, etc.), características, precios, etc.

- [Documentación AWS Amplify con GraphQL y AppSync](https://docs.amplify.aws/gen1/react/build-a-backend/graphqlapi/set-up-graphql-api/) - Artíuclo en inglés muy interesante sobre cómo podemos personalizar los tokens de acceso mediante un trigger lambda. También hay código de ejemplo.