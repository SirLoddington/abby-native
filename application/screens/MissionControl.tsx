import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabsParamList } from '../../NavigationTypes';

import { View, Text } from 'react-native';

import {
  UserCircleIcon,
  PencilSquareIcon,
  ChartBarIcon
} from 'react-native-heroicons/solid';

import Journal from './Journal';
import Analysis from './Analysis';
import Profile from './Profile';

import Header from '../common/Header';

export default function MissionControl() {
  const BottomTabs = createBottomTabNavigator<BottomTabsParamList>();
  return (
    <BottomTabs.Navigator
      //no header

      id="BottomTabs"
      initialRouteName="Journal"
      screenOptions={({ route }) => ({
        // {...props}
        // headerTitle: (props) => {
        //   console.log('props');
        //   console.log(props);
        //   return <Header {...props} />;
        // },
        tabBarShowLabel: false,
        tabBarStyle: {
          shadowOffset: {
            width: 0,
            height: 12
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,

          position: 'absolute',
          bottom: 15,
          // rounded: 'full',
          left: 20,
          right: 20,
          elevation: 24,
          borderRadius: 100,
          height: 70,
          backgroundColor: '#050531',
          borderTopColor: '#050531'
          //shadow
        },
        tabBarIcon: ({ focused, color, size }) => {
          let icon;

          switch (route.name) {
            case 'Journal':
              icon = (
                <PencilSquareIcon
                  style={{
                    color: '#ffffff',
                    opacity: focused ? 1 : 0.6
                  }}
                />
              );
              break;
            case 'Analysis':
              icon = (
                <ChartBarIcon
                  style={{
                    color: '#ffffff',
                    opacity: focused ? 1 : 0.6
                  }}
                />
              );
              break;
            case 'Profile':
              icon = (
                <UserCircleIcon
                  //Suck my nuts its assignable
                  style={{
                    color: '#ffffff',
                    opacity: focused ? 1 : 0.6
                  }}
                />
              );
              break;
          }

          return (
            //tintColor white
            <View className="items-center">
              {icon}
              <Text
                className={`text-white
                    ${focused ? 'opacity-100' : 'opacity-60'}
              font-title`}>
                {route.name}
              </Text>
            </View>
          );
        }
      })}>
      <BottomTabs.Screen name="Journal" component={Journal} />
      <BottomTabs.Screen
        name="Analysis"
        component={Analysis}
        initialParams={{ jid: '69' }}
      />
      <BottomTabs.Screen name="Profile" component={Profile} />
    </BottomTabs.Navigator>
  );
}
