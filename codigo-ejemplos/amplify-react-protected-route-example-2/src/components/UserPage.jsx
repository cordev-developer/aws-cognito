import { useAuthenticator } from "@aws-amplify/ui-react";

export function UserPage() {
  const { route } = useAuthenticator((context) => [context.route]);
  // console.log(route);
  
  return (
    <div>
      <h2>Esta página es para los grupos 'user' o 'admin' !</h2>
    </div> 
  ) 
}
