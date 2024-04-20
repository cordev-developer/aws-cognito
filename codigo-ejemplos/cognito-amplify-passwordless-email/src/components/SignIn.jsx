import React from 'react';
import { useForm } from 'react-hook-form';
import { signIn, signOut, getCurrentUser  } from 'aws-amplify/auth';



export const SignIn = () => {

  const {
    register: registerForm,
    handleSubmit: handleSubmitForm,
    formState: { errors: errorsForm1 },
    reset: reset1,
  } = useForm({
    defaultValues: {
      username: "",
      // email: "",
      password: "",
    },
  });

  const onSubmitForm = (data) => {
    const { username, password } = data;
    
    authSignIn(username, password);
    // console.log(data);
    reset1();
  };

  async function authSignIn(username, password) {
    try {
        const user = await signIn({ username, password});
        console.log('User info: ', user);
    } catch (error) {
        console.log('Error en método signing', error);
    }
  }

  async function authSignOut() {
    try {
        const response = await signOut();
        // const response = await signOut({ global: true });

        console.log('Response: ', response);
    } catch (error) {
        console.log('Error en método signout', error);
    }
  }

  async function authCurrentAuthenticatedUser() {
    try {
      const user = await getCurrentUser();
      console.log("User info: ", user);
    } catch (error) {
        console.log('error currentAuthenticatedUser: ', error);
    }
  }

  return (
    <div>
      <h1 className='heading'>Página de SignIn y SignOut</h1> 

      <form onSubmit={handleSubmitForm(onSubmitForm)}>
        <div className='div-inputs'>
          <label>Nombre usuario:</label>
          <input
            type="text"
            name="username"
            autoComplete="username" 
            {...registerForm("username", {
              required: {
                value: true,
                message: "Nombre usuario es requerido",
              },
              maxLength: 20,
              minLength: 2,
            })}
          />
          {!errorsForm1.username &&  <span>&nbsp;</span>}
          {errorsForm1.username?.type === "required" && <span className='error-messages'>{errorsForm1.username.message}</span>}
          {errorsForm1.username?.type === "maxLength" && (
            <span className='error-messages'>Nombre no debe ser mayor a 20 caracteres</span>
          )}
          {errorsForm1.username?.type === "minLength" && (
            <span className='error-messages'>Nombre debe ser mayor a 2 caracteres</span>
          )}
        </div>

        <div className='div-inputs'> 
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            autoComplete="current-password" 
            {...registerForm("password", {
              required: {
                value: true,
                message: "Contraseña es requerida",
              },
              minLength: {
                value: 6,
                message: "Contraseña debe ser mayor a 6 caracteres",
              },
            })}
          />
          {!errorsForm1.password &&  <span>&nbsp;</span>}
          {errorsForm1.password && <span className='error-messages'>{errorsForm1.password.message}</span>}
        </div>

        <button type="submit" className='submit-button'>SignIn</button>
        <button onClick={() => authSignOut()} type="button" className='signOut-button user-sign-out-button'>SignOut</button>
      </form> 
      <button onClick={() => authCurrentAuthenticatedUser()} type="button" className='currentUser-button'>CurrentAuthenticatedUser</button>
    </div>
  )
}
