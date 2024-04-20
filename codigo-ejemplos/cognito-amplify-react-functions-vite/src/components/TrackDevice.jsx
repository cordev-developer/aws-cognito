import React from 'react';
import { rememberDevice, forgetDevice, fetchDevices } from 'aws-amplify/auth';

export const TrackDevice = () => {

  async function handleRememberDevice() {
    try {
        const response = await rememberDevice();
        console.log('Response: ', response);
    } catch (error) {
        console.log('Error en método rememberDevice', error);
    }
  }

  async function handleForgetDevice() {
    try {
        const response = await forgetDevice();
        console.log('Response: ', response);
    } catch (error) {
        console.log('Error en método forgetDevice', error);
    }
  }

  async function handleFetchDevices() {
    try {
        const response = await fetchDevices();
        console.log('Response: ', response);
    } catch (error) {
        console.log('Error en método fetchDevices', error);
    }
  }

  return (
    <div>
      <h1 className='heading'>Página gestión tracking dispositivos usuarios</h1>
      <button onClick={() => handleRememberDevice()} type="button" className='signOut-button remember-device-button'>Remember device</button>
      <button onClick={() => handleForgetDevice()} type="button" className='signOut-button remember-device-button'>Forget device</button>
      <button onClick={() => handleFetchDevices()} type="button" className='signOut-button remember-device-button'>Fetch devices</button>
    </div>
  )
}