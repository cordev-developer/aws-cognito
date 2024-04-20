import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { Inicio } from '../components/Inicio';
import { SignIn } from '../components/SignIn';
import { SignUp } from '../components/SignUp';
import { SignOut } from '../components/SignOut';
import { ForgotPassword } from '../components/ForgotPassword';
import { CurrentAuthUser } from '../components/CurrentAuthUser';
import { TrackDevice } from '../components/TrackDevice';
import { SettingTOTP } from '../components/SettingTOTP';
import { DeleteUser } from '../components/DeleteUser';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';



export const Routing = () => {
  return (
    <BrowserRouter>
        {/*  HEADER Y NAVEGACIÓN  */}
        <Header/>


        { /* CONTENIDO PRINCIPAL */ }
        <section className="content">
          <Routes>
              <Route path="/" element={<Navigate to="/inicio"/>} />
              <Route path="/inicio" element={<Inicio/>} />
              <Route path="/signin" element={<SignIn/>} />
              <Route path="/signup" element={<SignUp/>} />
              <Route path="/signout" element={<SignOut/>} />
              <Route path="/forgotpassword" element={<ForgotPassword/>} />
              <Route path="/currentauthuser" element={<CurrentAuthUser/>} />
              <Route path="/trackdevice" element={<TrackDevice/>} />
              <Route path="/settingtotp" element={<SettingTOTP/>} />
              <Route path="/deleteuser" element={<DeleteUser/>} />
          </Routes>
        </section>


        { /* FOOTER */ }
        <Footer/>
        
    </BrowserRouter>
  )
}
