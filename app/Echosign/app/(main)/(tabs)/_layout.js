import { Tabs } from 'expo-router/tabs';
import CustomTabBar from '../../components/customtabbar'
export default function AppLayout() {
  console.log('app layout');
  return (
    <Tabs  screenOptions={{ headerShown: false}} 
    tabBar={(props) => <CustomTabBar {...props} />}>
      
      <Tabs.Screen
        name="mainPage"
        options={{
          tabBarIcon: require('../../assets/home.png'),
        
        }}
      />
      <Tabs.Screen
        name="friendlist"
        options={{
          tabBarIcon: require('../../assets/message.png'),
       
        }}
      />
      <Tabs.Screen
        name="searchusers"
        options={{
          tabBarIcon: require('../../assets/profile.png'),
        }}
      />

      <Tabs.Screen
        name="translate"
        options={{
          tabBarIcon: require('../../assets/translate.png'),

        }}
      />
    </Tabs>
  );
}
