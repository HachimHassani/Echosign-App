import { Text, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../context/auth';
import { Amplify, Auth } from 'aws-amplify';
import awsExports from '../src/aws-exports';
Amplify.configure(awsExports);

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => {
          Auth.signOut();
          
          console.log('User signed out');
          console.log(Auth.currentAuthenticatedUser());
        }}

    
      >
        <Text>Sign Out</Text>
      </TouchableOpacity>
      <Link href="/login">Login</Link>
      <Link href="/test">Test</Link>

    </View>
  );
}
