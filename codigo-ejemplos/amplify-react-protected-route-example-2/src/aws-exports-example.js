// NOTA IMPORTANTE:
// Este fichero de configuración se define así si usamos versiones de Amplify
// un poco más antiguas (aws-amplify: 5.3.12) que las de ahora (aws-amplify: 6.0.3)

// const awsExports = {
//   Auth: {
//     'userPoolId': 'tu_user_pool_id',
//     'userPoolWebClientId': 'tu_client_id'
//   }
// }



// Este fichero hay que renombrarlo a "aws-exports.js" que se cargue la configuración
// de Amplify y Cognito correctamente.

// Si usamos la versión 6 el fichero de configuración es así:

const awsExports = {
  Auth: {
    Cognito: {
      userPoolId: 'tu_user_pool_id',
      userPoolClientId: 'tu_client_id'
    }
  }
}

export default awsExports;

