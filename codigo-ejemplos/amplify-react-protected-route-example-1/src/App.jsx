import './App.css'
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import  awsExports from './aws-exports';
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from 'aws-amplify';
import { Authenticator } from "@aws-amplify/ui-react";

import { PublicPage } from "./pages/PublicPage";
import { ProtectedPage } from "./pages/ProtectedPage";


Amplify.configure(awsExports);

const MyRoutes = () => {
  return (
    <div className='layout'>
        <h2>React Router with AWS Amplify Cognito UI</h2>
        <ul>
          <li>
            <NavLink to="/public">Public Page</NavLink>
          </li>
          <li>
            <NavLink to="/protected">Protected Page</NavLink>
          </li>
        </ul>
        <hr />
        <Routes>
          <Route path="/public" element={<PublicPage />} />
          <Route path="/protected" element={<ProtectedPage />} />
          <Route exact path="/" element={<PublicPage />}/>
        </Routes>
    </div>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <Authenticator.Provider>
          <MyRoutes />
      </Authenticator.Provider>
    </BrowserRouter>
  );
}

export default App;
