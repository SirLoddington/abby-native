import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabsParamList } from '../NavigationTypes';

import { Text, View } from 'react-native';

import {
  UserCircleIcon,
  HomeIcon,
  PencilIcon,
  NewspaperIcon,
  ChartBarIcon,
  ChatBubbleBottomCenterTextIcon
} from 'react-native-heroicons/solid';

import Analysis from './Analysis';
import Create from './Create';
import Feed from './Feed';
import Homepage from './Homepage';
import Profile from './Profile';

export default function MissionControl() {
  const BottomTabs = createBottomTabNavigator<BottomTabsParamList>();
  return (
    <BottomTabs.Navigator
      id="BottomTabs"
      initialRouteName="Homepage"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon;

          switch (route.name) {
            case 'Homepage':
              icon = <HomeIcon />;
              break;
            case 'Feed':
              icon = <NewspaperIcon />;
              break;
            case 'Create':
              icon = <PencilIcon />;
              break;
            case 'Analysis':
              icon = <ChartBarIcon />;
              break;
            case 'Profile':
              icon = <UserCircleIcon />;
              break;
          }
          return (
            <View>
              {icon}
              {/* <Text>{route.name}</Text> */}
            </View>
          );
        }
      })}>
      <BottomTabs.Screen name="Homepage" component={Homepage} />
      <BottomTabs.Screen name="Feed" component={Feed} />
      <BottomTabs.Screen name="Create" component={Create} />
      <BottomTabs.Screen
        name="Analysis"
        component={Analysis}
        initialParams={{ jid: '69' }}
      />
      <BottomTabs.Screen name="Profile" component={Profile} />
    </BottomTabs.Navigator>
  );
}
