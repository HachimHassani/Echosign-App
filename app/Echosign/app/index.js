
import { Text, TouchableOpacity, View } from 'react-native';

import { useAuth } from '../context/auth';
import { Amplify, Auth } from 'aws-amplify';
import awsExports from '../src/aws-exports';
Amplify.configure(awsExports);

import { StatusBar } from 'expo-status-bar';
import {Link, Redirect} from 'expo-router';


export default function Index() {
  return (

    <Redirect href="/welcome" /> 

  );
}
