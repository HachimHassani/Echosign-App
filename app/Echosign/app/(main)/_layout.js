import { Slot,Stack } from 'expo-router';
import { Authenticator, useAuthenticator , picture} from '@aws-amplify/ui-react-native'
import { UserProvider } from '../../context/auth';
const formFields = {
    signUp: {
      email: {
        order:1
      },
      name: {
        order: 2
      },
      nickname: {
        order: 3
      },
      
      password: {
        order: 4
      },
      confirm_password: {
        order: 5
      }
    },
   }

export default function layout() {
  console.log('big layout');
  return (
    // Setup the auth context and render our layout inside of it.
    
   
      <Authenticator.Provider>
        <Authenticator formFields={formFields}  >
          <UserProvider>
          <Slot  />
          </UserProvider>

        </Authenticator>
      </Authenticator.Provider>
  
      
  );
}
