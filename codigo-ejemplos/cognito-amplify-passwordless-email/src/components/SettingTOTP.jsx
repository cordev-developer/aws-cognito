 import React from 'react';
 import { signUp, confirmSignIn, signIn, signOut } from 'aws-amplify/auth';
 import { useForm } from 'react-hook-form';

 
 export const SettingTOTP = () => {

    // Formulario registro usuario para introducir username, email y password
    const {
        register: registerForm1,
        handleSubmit: handleSubmitForm1,
        formState: { errors: errorsForm1 },
        reset: reset1,
      } = useForm({
        defaultValues: {
          username: "",
          password: "",
          email: "",
        },
    });

    // Formulario para introducir username e email para hacer el signin
    const {
        register: registerForm2,
        handleSubmit: handleSubmitForm2,
        formState: { errors: errorsForm2 },
        reset: reset2,
      } = useForm({
        defaultValues: {
          username: "",
          email: ""
        },
    });

    // Formulario para introducir código TOTP de confirmación de signin
    const {
        register: registerForm3,
        handleSubmit: handleSubmitForm3,
        formState: { errors: errorsForm3 },
        reset: reset3,
      } = useForm({
        defaultValues: {
          totp: "",
        },
    });



    // Gestión onSubmit de los formularios
    const onSubmitForm1 = ((data) => {
        const { password, email, username } = data;
    
        handlSignUp(username, email, password);
        reset1();
    });

    const onSubmitForm2 = ((data) => {
        const { email, username } = data;
    
        handleSignIn(username, email);
        reset2();
    });

    const onSubmitForm3 = ((data) => {
        const { totp } = data;
    
        handleConfirmSignIn(totp);
        reset3();
    });

  

    // Para ejecutar este método, el usuario tiene que tener ya configurado el TOTP
    // y habilitado el MFA por medio de Google Authenticator.
    async function handlSignUp(username, email, password) {
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
    

    // Para ejecutar este método, primero tenemos que hacer signin del usuario,
    // el cual ya tiene que tener configurado el TOTP.
    // Y luego le pasamos el código del TOTP de ese usuario logueado (current user).
    async function handleSignIn(username, email) {

        try {

            const { nextStep } = await signIn({ username,
                options: {
                    userAttributes: {
                      email,
                    },
                    authFlowType: 'CUSTOM_WITHOUT_SRP'
                } 
            });
            console.log('User has partial signed in.', nextStep);

        } catch (error) {
            console.log('Error en método handleSignIn', error);
        }
    }

    async function handleConfirmSignIn(totp) {

            try {
                const res = await confirmSignIn({ challengeResponse: totp });
                console.log('User has total signed in.', res);
              } catch (error) {
                console.log("Error en confirmSignIn method",error);
            }
    }

    async function authSignOut() {
        try {
            const response = await signOut();
            console.log('Response: ', response);
        } catch (error) {
            console.log('Error en método signout', error);
        }
    }

    return (
        <div className='container-qr'>
            <h1 className='heading'>Passwordless example</h1>

            <form onSubmit={handleSubmitForm1(onSubmitForm1)} className='form-1'>
                <div className='div-inputs'>
                <label>Nombre usuario:</label>
                <input
                    type="text"
                    name="username"
                    autoComplete="username" 
                    {...registerForm1("username", {
                    required: {
                        value: true,
                        message: "Nombre usuario es requerido",
                    },
                    maxLength: 50,
                    minLength: 2,
                    })}
                />
                {!errorsForm1.username &&  <span>&nbsp;</span>}
                {errorsForm1.username?.type === "required" && <span className='error-messages'>Nombre requerido</span>}
                {errorsForm1.username?.type === "maxLength" && (
                    <span className='error-messages'>Nombre no debe ser mayor a 50 caracteres</span>
                )}
                {errorsForm1.username?.type === "minLength" && (
                    <span className='error-messages'>Nombre debe ser mayor a 2 caracteres</span>
                )}
                </div>

                <div className='div-inputs'>
                    <label>Dirección email</label>
                    <input
                    type="text"
                    name="code"
                    {...registerForm1("email", {
                        required: {
                        value: true,
                        message: "Necesitas poner tu correo",
                        },
                    })}
                    />
                    {!errorsForm1.code &&  <span>&nbsp;</span>}
                    {errorsForm1.code?.type === "required" && (
                    <span className='error-messages'>Email requerido</span>
                    )}
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

                <button type="submit" className='submit-button set-totp-button'>SignUp</button>
            </form>

            <div className='qr-container'>
                <form onSubmit={handleSubmitForm2(onSubmitForm2)} className='form-1'>
                    <div className='div-inputs'>
                    <label>Nombre usuario:</label>
                    <input
                        type="text"
                        name="username"
                        autoComplete="username" 
                        {...registerForm2("username", {
                        required: {
                            value: true,
                            message: "Nombre usuario es requerido",
                        },
                        maxLength: 50,
                        minLength: 2,
                        })}
                    />
                    {!errorsForm2.username &&  <span>&nbsp;</span>}
                    {errorsForm2.username?.type === "required" && <span className='error-messages'>Nombre requerido</span>}
                    {errorsForm2.username?.type === "maxLength" && (
                        <span className='error-messages'>Nombre no debe ser mayor a 50 caracteres</span>
                    )}
                    {errorsForm2.username?.type === "minLength" && (
                        <span className='error-messages'>Nombre debe ser mayor a 2 caracteres</span>
                    )}
                    </div>

                    <div className='div-inputs'>
                    <label>Dirección email</label>
                    <input
                    type="text"
                    name="code"
                    {...registerForm2("email", {
                        required: {
                        value: true,
                        message: "Necesitas poner tu correo",
                        },
                    })}
                    />
                    {!errorsForm1.code &&  <span>&nbsp;</span>}
                    {errorsForm1.code?.type === "required" && (
                    <span className='error-messages'>Email requerido</span>
                    )}
                </div>                  
                    <button type="submit" className='submit-button set-totp-button'>SignIn</button>
                </form>
            </div>

            <div className='qr-container'>
                <form onSubmit={handleSubmitForm3(onSubmitForm3)} className='form-1'>
                    <div className='div-inputs'> 
                        <label>Código TOTP</label>
                        <input
                            type="number"
                            name="totp"
                            autoComplete="totp" 
                            {...registerForm3("totp", {
                            required: {
                                value: false,
                                message: "El código TOTP es requerido",
                            },
                            minLength: {
                                value: 6,
                                message: "TOTP Code debe ser mayor a 6 caracteres",
                            },
                            })}
                        />
                        {!errorsForm3.totp &&  <span>&nbsp;</span>}
                        {errorsForm3.totp && <span className='error-messages'>{errorsForm3.totp.message}</span>}
                    </div>
                    <button type="submit" className='submit-button set-totp-button'>ConfirmSignIn</button>
                </form>
                <div>
                    <button onClick={() => authSignOut()} type="button" className='signOut-button signOut-page-button'>SignOut</button>
                </div>
            </div>
        </div>
    )
}