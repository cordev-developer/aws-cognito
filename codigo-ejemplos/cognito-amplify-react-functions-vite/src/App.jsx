import './App.css';
import { Routing } from './router/Routing';
import  awsExports from './aws-exports';
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from 'aws-amplify';

import { CookieStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';

// Configurar opciones adicionales de las cookies
const cookieOptions = {
  domain: 'localhost', 
  expires: 30,     // 30 dias
  // expires: 30 / (24 * 60), // 30 minutos 
  secure: true, 
  sameSite: 'lax',
};

Amplify.configure(awsExports);

// cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage(cookieOptions));
// cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage());


function App() {
  return (
    <div className='layout'>
      <Routing/>
    </div>
  );
}

export default App;
