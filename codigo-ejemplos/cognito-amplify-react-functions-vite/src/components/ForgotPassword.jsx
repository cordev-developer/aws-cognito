import React from 'react';
import { useForm } from 'react-hook-form';
import { resetPassword, confirmResetPassword } from 'aws-amplify/auth';

export const ForgotPassword = () => {

  const {
    register: registerForm1,
    handleSubmit: handleSubmitForm1,
    formState: { errors: errorsForm1 },
    reset: reset1,
  } = useForm({
    defaultValues: {
      username: "",
    },
  });

  const {
    register: registerForm2,
    handleSubmit: handleSubmitForm2,
    formState: { errors: errorsForm2 },
    reset: reset2,
  } = useForm({
    defaultValues: {
      newPassword: "",
      code: "",
      username: "",
    },
  });

  const onSubmitForm1 = (async (data) => {
    const { username } = data;

    try {
      const user = await resetPassword({ username });
      console.log('Se ha enviado un código a tu email.');
      console.log(user);
    } catch (error) { 
        console.log('Error en método forgotPassword', error);
    }
    reset1();
  });

  const onSubmitForm2 = (async (data) => {
    const { username, code, newPassword } = data;
    const confirmationCode = code;

    try {
      const user = await confirmResetPassword({ username, confirmationCode, newPassword });
      console.log('Contraseña cambiada: ', user);
    } catch (error) {
        console.log('Error en método forgotPasswordSubmit', error);
    }
    reset2();
  });


  return (
    <div className='form-container'>
      <h1 className='heading'>Página recuperar contraseña o forgot password</h1>

      <form onSubmit={handleSubmitForm1(onSubmitForm1)} className='forgot-form-1'>
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
        </div>

        <button type="submit" className='submit-button'>Enviar</button>
      </form> 

      <form onSubmit={handleSubmitForm2(onSubmitForm2)} className='forgot-form-2'>

        <div className='div-inputs'>
            <label>Nombre usuario:</label>
            <input
              type="text"
              name="username"
              {...registerForm2("username", {
                required: {
                  value: true,
                  message: "Nombre usuario es requerido",
                },
                maxLength: 20,
                minLength: 2,
              })}
            />
            {!errorsForm2.username &&  <span>&nbsp;</span>}
            {errorsForm2.username?.type === "required" && <span className='error-messages'>Nombre requerido</span>}
            {errorsForm2.username?.type === "maxLength" && (
              <span className='error-messages'>Nombre no debe ser mayor a 20 caracteres</span>
            )}
            {errorsForm2.username?.type === "minLength" && (
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
                    message: "Nesitas poner un código",
                  },
                })}
              />
              {!errorsForm2.code &&  <span>&nbsp;</span>}
              {errorsForm2.code?.type === "required" && (
                <span className='error-messages'>Código requerido</span>
              )}
            </div>

            <div className='div-inputs'>
              <label>Nueva contraseña:</label>
              <input
                type="text"
                name="newPassword"
                {...registerForm2("newPassword", {
                  required: {
                    value: true,
                    message: "Nueva contraseña es requerido",
                  },
                  maxLength: 20,
                  minLength: 2,
                })}
              />
              {!errorsForm2.newPassword &&  <span>&nbsp;</span>}
              {errorsForm2.newPassword?.type === "required" && <span className='error-messages'>Nueva contraseña es requerido</span>}
              
            </div>

            <button type="submit" className='submit-button'>Enviar</button>
      </form> 
    </div>
  )
}
