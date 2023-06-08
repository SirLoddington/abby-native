import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabsParamList } from '../NavigationTypes';

import { View, Text, Image } from 'react-native';

import {
  UserCircleIcon,
  PencilSquareIcon,
  ChartBarIcon
} from 'react-native-heroicons/solid';

import Journal from './screens/Journal';
import Analysis from './screens/Analysis';
import Profile from './screens/Profile';

import DateHeader from './headers/DateHeader';
import NavHeader from './headers/NavHeader';

export default function BottomBar() {
  const BottomTabs = createBottomTabNavigator<BottomTabsParamList>();
  return (
    <BottomTabs.Navigator
      //no header

      id="BottomTabs"
      initialRouteName="Journal"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,

        //BottomTabBar, parent of all tabs, has inset bottom:34, making this off centre
        //Not sure how to access its style props
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center'
        },

        tabBarStyle: {
          position: 'absolute',
          height: 100,

          alignItems: 'center',
          justifyContent: 'center'
        },
        tabBarIcon: ({ focused, color, size }) => {
          let icon;
          switch (route.name) {
            case 'Journal':
              icon = (
                <PencilSquareIcon
                  size={size * 1.5}
                  style={{
                    color: focused ? '#0065FF' : '#404040'
                  }}
                />
              );
              break;
            case 'Analysis':
              icon = (
                <ChartBarIcon
                  size={size * 1.5}
                  style={{
                    color: focused ? '#0065FF' : '#404040'
                  }}
                />
              );
              break;
            case 'Profile':
              icon = (
                <UserCircleIcon
                  size={size * 1.5}
                  style={{
                    color: focused ? '#0065FF' : '#404040'
                  }}
                />
              );
              break;
          }

          return <View className="items-center justify-center ">{icon}</View>;
        }
      })}>
      <BottomTabs.Screen
        name="Journal"
        component={Journal}
        options={{
          headerTitle: (props) => <></>,
          headerLeft: (props) => <DateHeader {...props} />,
          headerRight: () => <NavHeader />
        }}
      />
      <BottomTabs.Screen
        name="Analysis"
        component={Analysis}
        options={{ headerShown: false }}
      />
      <BottomTabs.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </BottomTabs.Navigator>
  );
}
