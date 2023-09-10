import { Slot } from 'expo-router';
import { Provider } from '../context/provider';

export default function Root() {
  return (
    // Setup the auth context and render our layout inside of it.
  
      <Slot />
  );
}
