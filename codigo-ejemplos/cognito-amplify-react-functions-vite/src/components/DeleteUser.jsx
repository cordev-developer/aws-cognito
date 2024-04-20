import React from 'react';
import { deleteUser} from 'aws-amplify/auth';

export const DeleteUser = () => {

  async function deleteUserAccount() {
    try {
        const response = await deleteUser();
        console.log('Response: ', response);
    } catch (error) {
        console.log('Error en método deleteUser', error);
    }
  }

  return (
    <div>
      <h1 className='heading'>Página para eliminar usuario/cuenta usuario</h1>
      <button onClick={() => deleteUserAccount()} type="button" className='delete-user-button'>Eliminar usuario</button>
    </div>
  )
}