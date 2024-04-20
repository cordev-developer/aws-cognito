import './App.css';
import  awsExports from './aws-exports';
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from 'aws-amplify';
import { SettingTOTP } from './components/SettingTOTP';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { BrowserRouter } from 'react-router-dom';

Amplify.configure(awsExports);

function App() {
  return (
    <BrowserRouter>
    <div className='layout'>
      <Header/>
      <SettingTOTP/>
      <Footer/>
    </div>
    </BrowserRouter>

  );
}

export default App;
