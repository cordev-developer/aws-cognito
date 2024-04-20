# Servidor de recursos con Spring Boot y Cognito

En este ejemplo se muestra cómo contruir un servidor de recursos con Cognito y Spring Boot. Para que funcione correctamente debemos crear primero
un User Pool con su servidor de recursos, y luego crear permisos de lectura/escritura. Nuestro User Pool tendrá activado el flujo Client Credentials
Grant, y enviaremos peticiones al punto /oauth2/token solicitando un access token con el permisos adecuado. Al enviar esta petición utilizaremos
un tipo de autorización "Basic Auth" junto con el "clientId" en el "Username" y el "client secret" en el campo "Password". Posteriormente 
el body de la petición con el permisos que requiramos (read/write) de nuestro servidor de recursos. Finalmente obtendremos el token de acceso, y 
ese token podremos realizar peticiones a nuestra API en Spring Boot implementada en el controlador.

## Tecnologias

* AWS Cognito
* Java JDK 17
* Spring Boot 3.2.4
* Maven 

## Algunas dependencias relevantes

* `spring-boot-starter-oauth2-resource-server`

 ## Referencias

- [Documentación configuración servidor de recursos con OAuth2.0](https://docs.spring.io/spring-security/reference/servlet/oauth2/resource-server/jwt.html) - Documentación oficial Spring sobre configuración servidor de recursos con OAuth2.0
- [Guía desarroladores AWS SDK Java 2.x](https://docs.aws.amazon.com/es_es/sdk-for-java/latest/developer-guide/home.html) - Documentación oficial AWS Guía Desarrolladores SDK para Java 2.x en Español



