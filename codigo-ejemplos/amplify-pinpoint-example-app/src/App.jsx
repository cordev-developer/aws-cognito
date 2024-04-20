// En este ejemplo se usa la versión 5 de Amplify (los registros de los eventos y records son diferentes
// a la versión 6)

import "./App.css";
import { Amplify, Auth, Analytics } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);
Amplify.Logger.LOG_LEVEL = "DEBUG";



const amplifyConfig = {
  Auth: {
    identityPoolId: 'us-east-1:6ebb0114-5e3a-4bbc-afcd-f70d33f739c3',
    region: 'us-east-1'
  }
}



// Para convertir un objeto a un array de strings usamos el siguiente código:

const mapObj = f => obj =>
  Object.keys(obj).reduce((acc, key) => ({ ...acc, [key]: f(obj[key]) }), {});
const toArrayOfStrings = value => [`${value}`];
const mapToArrayOfStrings = mapObj(toArrayOfStrings);

Analytics.autoTrack('session', {
  // REQUIRED, turn on/off the auto tracking
  enable: true,
  // OPTIONAL, the attributes of the event, you can either pass an object or a function
  // which allows you to define dynamic attributes
  attributes: {
    attr: 'attr'
  },
  // when using function
  // attributes: () => {
  //    const attr = somewhere();
  //    return {
  //        myAttr: attr
  //    }
  // },
  // OPTIONAL, the service provider, by default is the Amazon Pinpoint
  provider: 'AWSPinpoint'
});


//Initialize Amplify
Auth.configure(amplifyConfig);





async function trackUserId() {
  try {
    console.log("==============================");
    const { attributes } = await Auth.currentAuthenticatedUser();
    const userAttributes = mapToArrayOfStrings(attributes);
    console.log("==============================");
    console.log("event called", userAttributes);
    console.log("==============================");

    Analytics.updateEndpoint({
      address: attributes.email,
      channelType: "EMAIL",
      optOut: "NONE",
      userId: attributes.sub,
      userAttributes,
    });
    console.log("event success");
    console.log("==============================");

  } catch (error) {
    console.log("==============================");
    console.log("ERROR", error);
    console.log("==============================");
  }
}


async function addRecord1() {
  try {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const userAttributes = mapToArrayOfStrings(attributes);

    Analytics.updateEndpoint({
      address: attributes.email,
      channelType: "EMAIL",
      optOut: "NONE",
      userId: attributes.sub,
      userAttributes,
    });

    const result1 = Analytics.record({
      name : 'some-event-name',
      immediate: true
    });

    console.log("Logged Event1", result1);

  } catch (error) {
    console.log("==============================");
    console.log("ERROR", error);
    console.log("==============================");
  }
}


async function addRecord2() {
  try {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const userAttributes = mapToArrayOfStrings(attributes);

    Analytics.updateEndpoint({
      address: attributes.email,
      channelType: "EMAIL",
      optOut: "NONE",
      userId: attributes.sub,
      userAttributes,
    });

    const result2 = Analytics.record({
      name: 'Album',
      attributes: { genre: 'Rock', year: '2024'},
      immediate: true
    });
    
    console.log("Logged Event2",result2)

  } catch (error) {
    console.log("==============================");
    console.log("ERROR", error);
    console.log("==============================");
  }
}


function App({ signOut, user }) {

  return (
    <>
      <h1>Hello {user.username}</h1>
      <h1>{user.user}</h1>
      <button onClick={signOut}>Sign out</button>
      <br></br>
        <button onClick={trackUserId}>Track User Id</button>
        <br></br>
        <button onClick={addRecord1}>Add Record 1</button>
        <br></br>
        <button onClick={addRecord2}>Add Record 2</button>
    </>
  );
}


export default withAuthenticator(App);



