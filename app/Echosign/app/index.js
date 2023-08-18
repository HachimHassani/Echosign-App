import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import welcome from './(welcome)/welcome';

export default function App() {
  return (
    <View className="flex-1 bg-cyan-200 items-center justify-center">
      <Text className="text-xl">main page!</Text>
      <Link href="/login" className="text-blue-500">login</Link>
      <Link href="/screens/welcome" className="text-blue-500">welcome</Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  // You can keep this empty for now or customize as needed
});
