import React from 'react';
import { signOut } from 'aws-amplify/auth';

export const SignOut = () => {

  async function authSignOut() {
    try {
        const response = await signOut();
        // const response = await signOut({ global: true });
        console.log('Response: ', response);
    } catch (error) {
        console.log('Error en método signout', error);
    }
  }

  return (
    <div>
      <h1 className='heading'>Página de SignOut o logout</h1>
      <button onClick={() => authSignOut()} type="button" className='signOut-button signOut-page-button'>SignOut</button>
    </div>
  )
}
