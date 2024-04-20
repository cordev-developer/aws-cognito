import React from 'react';
import { useForm } from 'react-hook-form';
import { signUp, confirmSignUp, resendSignUpCode  } from 'aws-amplify/auth';


export const SignUp = () => {
  const {
    register: registerForm1,
    handleSubmit: handleSubmitForm1,
    formState: { errors: errorsForm1 },
    reset: reset1,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const {
    register: registerForm2,
    handleSubmit: handleSubmitForm2,
    formState: { errors: errorsForm2 },
    reset: reset2,
    watch: watchForm2,
  } = useForm({
    defaultValues: {
      usernameForCode: "",
      code: "",
    },
  });

  const onSubmitForm1 = ((data) => {
    const { username, email, password } = data;
    // console.log(data);

    authSignUp(username, email, password);
    reset1();
  });

  async function authSignUp(username, email, password) {

    try {
        const user = await signUp({ username, password, 
          options: {
            userAttributes: {
              email,
            }
          }
         });
        console.log('User info: ', user);
    } catch (error) {
        console.log('Error en método signup', error);
    }
  }

  const onSubmitForm2 = ((data) => {
    const { usernameForCode, code } = data;
    // console.log(data);

    authConfirmSignUp(usernameForCode, code);
    reset2();
  });

  async function authConfirmSignUp(username, confirmationCode) {

    try {
        const user = await confirmSignUp({ username, confirmationCode });
        console.log('User info: ', user);
    } catch (error) {
        console.log('Error en método confirmSignUp', error);
    }
  }

  async function resendCode() {
    const username = watchForm2("usernameForCode");

    try {
        const user = await resendSignUpCode({ username });
        console.log('Respuesta resendCode: ', user);
    } catch (error) {
        console.log('Error en método resend code', error);
    }
  }


  return (
    <div className='form-container'>
      <h1 className='heading'>Página de SignUp o registro</h1> 


      <form onSubmit={handleSubmitForm1(onSubmitForm1)} className='signup-form-1'>
        <div className='div-inputs'>
          <label>Nombre usuario:</label>
          <input
            type="text"
            name="username"
            {...registerForm1("username", {
              required: {
                value: true,
                message: "Nombre usuario es requerido",
              },
              maxLength: 20,
              minLength: 2,
            })}
          />
          {!errorsForm1.username &&  <span>&nbsp;</span>}
          {errorsForm1.username?.type === "required" && <span className='error-messages'>Nombre requerido</span>}
          {errorsForm1.username?.type === "maxLength" && (
            <span className='error-messages'>Nombre no debe ser mayor a 20 caracteres</span>
          )}
          {errorsForm1.username?.type === "minLength" && (
            <span className='error-messages'>Nombre debe ser mayor a 2 caracteres</span>
          )}
        </div>

        <div className='div-inputs'>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            autoComplete="email" 
            {...registerForm1("email", {
              required: {
                value: true,
                message: "Correo es requerido",
              },
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Correo no válido",
              },
            })}
          />
          {!errorsForm1.email &&  <span>&nbsp;</span>}
          {errorsForm1.email && <span className='error-messages'>{errorsForm1.email.message}</span>}
        </div>

        <div className='div-inputs'> 
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            autoComplete="current-password" 
            {...registerForm1("password", {
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

        <button type="submit" className='submit-button'>Enviar</button>
      </form> 


      <form onSubmit={handleSubmitForm2(onSubmitForm2)} className='signup-form-2'>
          <div className='div-inputs'>
            <label>Nombre usuario:</label>
            <input
              type="text"
              name="usernameForCode"
              {...registerForm2("usernameForCode", {
                required: {
                  value: true,
                  message: "Nombre usuario es requerido",
                },
                maxLength: 20,
                minLength: 2,
              })}
            />
            {!errorsForm2.usernameForCode &&  <span>&nbsp;</span>}
            {errorsForm2.usernameForCode?.type === "required" && <span className='error-messages'>{errorsForm1.usernameForCode.message}</span>}
            {errorsForm2.usernameForCode?.type === "maxLength" && (
              <span className='error-messages'>Nombre no debe ser mayor a 20 caracteres</span>
            )}
            {errorsForm2.usernameForCode?.type === "minLength" && (
              <span className='error-messages'>Nombre debe ser mayor a 2 caracteres</span>
            )}
          </div>
          <div className='div-inputs'>
            <label>Código de confirmación</label>
            <input
              type="text"
              name="code"
              {...registerForm2("code", {
                required: {
                  value: true,
                  message: "Necesitas poner un código",
                },
              })}
            />
            {!errorsForm2.code &&  <span>&nbsp;</span>}
            {errorsForm2.code?.type === "required" && (
              <span className='error-messages'>Código requerido</span>
            )}
          </div>

          <button type="submit" className='submit-button'>Enviar</button>
          <button onClick={() => resendCode()} type="button" className='resend-button resend-code-button'>Reenviar código</button>
      </form>
    </div>
  )
}
