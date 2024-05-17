// NOTA IMPORTANTE:
// Este fichero de configuración se define así porque estamos usando versiones de Amplify
// un poco más antiguas (aws-amplify: 5.3.12) que las de ahora (aws-amplify: 6.0.3)

// const awsExports = {
//   // Usamos user pool llamado 'reinvent-user-pool-1'
//   Auth: {
//     'userPoolId': 'tu_user_pool_id',
//     'userPoolWebClientId': 'tu_client_id'
//   }
// }



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
