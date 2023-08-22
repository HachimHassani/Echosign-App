import { Slot,Stack } from 'expo-router';
import { Provider } from '../context/auth';

export default function layout() {
  return (
    // Setup the auth context and render our layout inside of it.
   
      <Slot
    />
       
      
  );
}
