 import React, { useState } from 'react';
 import { signIn, confirmSignIn,setUpTOTP, verifyTOTPSetup,
                updateMFAPreference
                } from 'aws-amplify/auth';
 import { QRCodeCanvas } from 'qrcode.react';
 import { useForm } from 'react-hook-form';

 
 export const SettingTOTP = () => {

    const [str, setStr] = useState('https://www.example.com');

    // Formulario comprobación o SignIn mediante TOTP
    const {
        register: registerForm1,
        handleSubmit: handleSubmitForm1,
        formState: { errors: errorsForm1 },
        reset: reset1,
      } = useForm({
        defaultValues: {
          username: "",
          password: "",
          code: "",
        },
    });

    // Formulario configuración TOTP o SetUpTOTP
    const {
        register: registerForm2,
        handleSubmit: handleSubmitForm2,
        formState: { errors: errorsForm2 },
        reset: reset2,
      } = useForm({
        defaultValues: {
          usernameForCode: "",
          code: "",
        },
    });

    // Formulario verificación TOTP o VerifyTOTP
    const {
        register: registerForm3,
        handleSubmit: handleSubmitForm3,
        formState: { errors: errorsForm3 },
        reset: reset3,
      } = useForm({
        defaultValues: {
          username: "",
          password: "",
        },
    });


    // Gestión onSubmit de los formularios
    const onSubmitForm1 = ((data) => {
        const { username, password, code } = data;
    
        handlSignIn(username, password, code);
        reset1();
    });

    const onSubmitForm2 = ((data) => {
        const { username, password } = data;
    
        settingTOTP(username, password);
        reset2();
    });

    const onSubmitForm3 = ((data) => {
        const { code } = data;
    
        verifyTOTP(code);
        reset3();
    });
    

    // Para ejecutar este método, el usuario tiene que tener ya configurado el TOTP
    // y habilitado el MFA por medio de Google Authenticator.
    async function handlSignIn(username, password, code) {
        try {
            const cognitoUser = await signIn({ username, password });
            console.log('output: ', cognitoUser);
            
            const response = await confirmSignIn({ cognitoUser, challengeResponse: code });

            // console.log('Response: ', response);

        } catch (error) {
            console.log('Error en método signing', error);
        }
    }
    

    // Primero tenemos que hacer signin del usuario,
    // es decir, el usuario tiene que estar logueado y luego configuramos
    // el TOTP (Google Authenticator) y generamos el código QR. 
    async function settingTOTP(username, password) {

        try {
           
            const user = await signIn({ username, password });
            console.log('output: ', user);

            const totpSetupDetails = await setUpTOTP({ user });
            console.log('totpSetupDetails: ', totpSetupDetails);

            const appName = 'jcorral-App';
            const setupUri = totpSetupDetails.getSetupUri(appName);
            setStr(setupUri);


            // Podemos usar también esta otra alternativa para hacer lo mismo

            // const user = await getCurrentUser();
            // const secretCode = await setUpTOTP(user);

            // Generate QR code
            // const str = "otpauth://totp/AWSCognito:" + user.username + "?secret=" + secretCode + "&issuer=" + "AWSCognito";
            // setStr(str);

            // const response = await updateMFAPreference(user, 'TOTP');

            // console.log('Response: ', response);
        } catch (error) {
            console.log('Error en método settingTOTP', error);
        }
    }


    // Para ejecutar este método, primero tenemos que hacer signin del usuario,
    // el cual ya tiene que tener configurado el TOTP.
    // Y luego le pasamos el código del TOTP de ese usuario logueado (current user).
    async function verifyTOTP(totpCode) {

        try {

            const response = await verifyTOTPSetup({ code: totpCode });
            const response2 = await updateMFAPreference({ totp: 'PREFERRED' });

            console.log('Response: ', response);
        } catch (error) {
            console.log('Error en método verifyTOTPSetup', error);
        }
    }


    return (
        <div className='container-qr'>
            <h1 className='heading'>Página gestión TOTP</h1>

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
                <div className='div-inputs'>
                    <label>Código de confirmación</label>
                    <input
                    type="text"
                    name="code"
                    {...registerForm1("code", {
                        required: {
                        value: true,
                        message: "Necesitas poner un código",
                        },
                    })}
                    />
                    {!errorsForm1.code &&  <span>&nbsp;</span>}
                    {errorsForm1.code?.type === "required" && (
                    <span className='error-messages'>Código requerido</span>
                    )}
                </div>
                <button type="submit" className='submit-button set-totp-button'>SignIn</button>
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
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            name="password"
                            autoComplete="current-password" 
                            {...registerForm2("password", {
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
                        {!errorsForm2.password &&  <span>&nbsp;</span>}
                        {errorsForm2.password && <span className='error-messages'>{errorsForm2.password.message}</span>}
                    </div>
                    
                    <button type="submit" className='submit-button set-totp-button'>SetUpTOTP</button>
                </form>

                {/* Render QR code */}
                <QRCodeCanvas value={str} className='qr-canvas'/>
            </div>

            <form onSubmit={handleSubmitForm3(onSubmitForm3)} className='form-3'>
                <div className='div-inputs'>
                    <label>Código de confirmación</label>
                    <input
                    type="text"
                    name="code"
                    {...registerForm3("code", {
                        required: {
                        value: true,
                        message: "Necesitas poner un código",
                        },
                    })}
                    />
                    {!errorsForm3.code &&  <span>&nbsp;</span>}
                    {errorsForm3.code?.type === "required" && (
                    <span className='error-messages'>Código requerido</span>
                    )}
                </div>

                <button type="submit" className='submit-button signOut-button remember-device-button'>VerifyTOTP</button>
            </form>
        </div>
    )
}