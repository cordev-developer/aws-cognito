import React from 'react';
import { getCurrentUser } from 'aws-amplify/auth';

export const CurrentAuthUser = () => {

  async function currentAuthenticatedUser() {
    try {
      const user = await getCurrentUser();
      console.log("User attrributes: ", user);
    } catch (error) {
        console.log('error currentAuthenticatedUser: ', error);
    }
  }


  return (
    <div>
      <h1 className='heading'>Página de información del usuario o user info</h1>  
      <button onClick={() => currentAuthenticatedUser()} type="button" className='currentUser-button current-auth-page-button'>CurrentAuthenticatedUser</button>
    </div>
  )
}

