// const awsExports = {
//   Auth: {
//     'userPoolId': 'tu_user_pool_id',
//     'userPoolWebClientId': 'tu_client_id'
//   }
// }



// NOTA IMPORTANTE:
// Este fichero de configuración se define así porque estamos usando versiones de Amplify
// un poco más antiguas (aws-amplify: 5.3.12) que las de ahora (aws-amplify: 6.0.3)

// Este fichero hay que renombrarlo a "aws-exports.js" que se cargue la configuración
// de Amplify y Cognito correctamente.

// Si estubieramos usando la versión 6.0.3 el fichero de configuración sería:

const awsExports = {
  Auth: {
    Cognito: {
      userPoolId: 'tu_user_pool_id',
      userPoolClientId: 'tu_client_id'
    }
  }
}

export default awsExports;

