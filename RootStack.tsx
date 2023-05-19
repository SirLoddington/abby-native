import MissionControl from './application/screens/MissionControl';
import { createStackNavigator } from '@react-navigation/stack';

import { RootStackParamList } from './NavigationTypes';

import Profile from './application/screens/Profile';
import Lifestyle from './application/screens/Profile/Lifestyle';
import MedicalHistory from './application/screens/Profile/MedicalHistory';
import MedicalTeam from './application/screens/Profile/MedicalTeam';
import Personal from './application/screens/Profile/Personal';
import { NavigationContainer } from '@react-navigation/native';

export default function RootStack() {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator
        id="RootStack"
        initialRouteName="MissionControl"
        screenOptions={
          {
            // headerShown: false
          }
        }>
        <Stack.Screen name="MissionControl" component={MissionControl} />
        {/* <Stack.Screen name="Profile" component={Profile} /> */}
        <Stack.Screen name="Lifestyle" component={Lifestyle} />
        <Stack.Screen name="MedicalHistory" component={MedicalHistory} />
        <Stack.Screen name="MedicalTeam" component={MedicalTeam} />
        <Stack.Screen name="Personal" component={Personal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
