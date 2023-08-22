import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Link} from 'expo-router';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Link href="/login" className="text-blue-500">login</Link>
      <Link href="/start" className="text-blue-500">start</Link>
      <Link href="/welcome" className="text-blue-500">welcome</Link>
      <Link href="/getStarted" className="text-blue-500">getStarted</Link>
      <Link href="/sinzee" className="text-blue-500">sinzee</Link>
      <Link href="/waiting" className="text-blue-500">waiting</Link>
      <Link href="/languages" className="text-blue-500">languages</Link>
      <Link href="/createOption" className="text-blue-500">createacc</Link>
      <Link href="/mainPage" className="text-blue-500">mainPage</Link>
      <Link href="/test" className="text-blue-500">tst</Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
