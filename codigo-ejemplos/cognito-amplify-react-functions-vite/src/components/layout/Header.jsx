import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header className='header'>
        <h1 className='h1-header'>Probando funciones en Cognito con AWS Amplify</h1>
        <nav>
            <ul>
                <li>
                    <NavLink to="/inicio" 
                        className={({isActive}) => isActive ? "active" : ""}>Inicio</NavLink>
                </li>
                <li>
                    <NavLink to="/signin"
                        className={({isActive}) => isActive ? "active" : ""}>SignIn/SignOut</NavLink>
                </li>
                <li>
                    <NavLink to="/signup" 
                        className={({isActive}) => isActive ? "active" : ""}>SignUp</NavLink>
                </li>
                <li>
                    <NavLink to="/signout" 
                        className={({isActive}) => isActive ? "active" : ""}>SignOut</NavLink>
                </li>
                <li>
                    <NavLink to="/forgotpassword" 
                        className={({isActive}) => isActive ? "active" : ""}>ForgotPassword</NavLink>
                </li>
                <li>
                    <NavLink to="/currentauthuser"
                        className={({isActive}) => isActive ? "active" : ""}>CurrentAuthUser</NavLink>
                </li>
                <li>
                    <NavLink to="/trackdevice"
                        className={({isActive}) => isActive ? "active" : ""}>TrackDevice</NavLink>
                </li>
                <li>
                    <NavLink to="/settingtotp"
                        className={({isActive}) => isActive ? "active" : ""}>SetTOTP</NavLink>
                </li>
                <li>
                    <NavLink to="/deleteuser"
                        className={({isActive}) => isActive ? "active" : ""}>DeleteUser</NavLink>
                </li>
            </ul>
        </nav>
    </header>
  )
}
