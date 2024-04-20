import React, { useState } from 'react';
import './App.css';
import { Amplify } from 'aws-amplify';
import { signIn, confirmSignIn, signOut } from 'aws-amplify/auth';
import amplifyconfig from './amplifyconfiguration.json';
import ReCAPTCHA from "react-google-recaptcha";


Amplify.configure(amplifyconfig);


function App() {
  const [captcha, setCaptcha] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSignIn = async (event, username, password) => {
    event.preventDefault();

    if (captcha) {
      try {
        const response = await signIn({
          username,
          password,
          options: {
            authFlowType: 'CUSTOM_WITH_SRP'
          }
        });
        if (
          response.nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE"
        ) {
          const res = await confirmSignIn({ challengeResponse: captcha });
          console.log('User has signed in.', res);
          alert(`Usuario ${username} logueado correctamente !!`);
        }
      } catch (e) {
        console.log('Ha habido un error = ', e)
        const response = await signOut();
      }
    }
  };

  const handleConfirmSignIn = async (value) => {

    try {
      console.log('value: ', value);
      setCaptcha(value);

    } catch (e) {
      console.log('Handle captcha failed: ', e);
    }
  };

  const authSignOut = async () => {
    try {
        const response = await signOut();
        // const response = await signOut({ global: true });
        console.log('Se ha hecho Signout, response = ', response);
        alert("Se ha hecho logout correctamente")
        setCaptcha(false);
    } catch (error) {
        console.log('Error en método signout', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  return (
      <>
        <main>
          <div className="login-card">
            <div className="card-header">
              <div className="log">Login</div>
            </div>

            <form onSubmit={(event) => handleSignIn(event, formData.username, formData.password)}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input required={true} name="username" id="username" type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                />

              </div>

              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input required={true} name="password" id="password" type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="captcha">
                <ReCAPTCHA
                  sitekey="6Lfl0pcpAAAAAKQRoJ_mdym12Xac7ZQL9SL5VxLc"
                  onChange={(value) => handleConfirmSignIn(value)}
                />
              </div>
              
              <div className="form-group">
                <input value="Login" type="submit"/>
              </div>
            </form>

            <button className="signout-button" onClick={() => authSignOut()} type="button">
              Logout
            </button>
          </div>
        </main>
      </>
  )
};


export default App;
