import BottomBar from './BottomBar';
import { createStackNavigator } from '@react-navigation/stack';

import { RootStackParamList } from '../NavigationTypes';

// import Profile from './screens/Profile';
// import Lifestyle from './screens/Profile/Lifestyle';
// import MedicalHistory from './screens/Profile/MedicalHistory';
// import MedicalTeam from './screens/Profile/MedicalTeam';
// import Personal from './screens/Profile/Personal';
import { NavigationContainer } from '@react-navigation/native';

import Header from './headers/Header';
import HeaderLeft from './headers/HeaderLeft';
import Journalling from './screens/Journal/Create';
import JournalPage from './screens/Journal/JournalPage';

export default function RootStack() {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator id="RootStack" initialRouteName="BottomBar">
        <Stack.Screen
          name="BottomBar"
          component={BottomBar}
          options={{
            headerShown: false
          }}
        />

        {/* JOURNAL */}
        <Stack.Screen name="Journalling" component={Journalling} />
        <Stack.Screen name="JournalPage" component={JournalPage} />

        {/* ANALYSIS */}

        {/* PROFILE */}
        {/* <Stack.Screen name="Lifestyle" component={Lifestyle} />
        <Stack.Screen name="MedicalHistory" component={MedicalHistory} />
        <Stack.Screen name="MedicalTeam" component={MedicalTeam} />
        <Stack.Screen name="Personal" component={Personal} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
