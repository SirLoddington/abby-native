import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabsParamList } from '../../NavigationTypes';

import { View, Text, Image } from 'react-native';

import {
  UserCircleIcon,
  PencilSquareIcon,
  ChartBarIcon
} from 'react-native-heroicons/solid';

import Journal from './Journal';
import Analysis from './Analysis';
import Profile from './Profile';

import Header from '../Headers/Header';
import DateHeader from '../Headers/DateHeader';

function LogoTitle() {
  return (
    //Far left of header
    <View
      className="absolute
    left-0 bg-blue w-50
    ">
      <Image
        style={{ width: 50, height: 50 }}
        source={require('../../assets/transparent100x100.png')}
      />
    </View>
  );
}

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

        //BottomTabBar, parent of all tabs, has inset bottom:34, making this off centre
        //Not sure how to access its style props
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center'
        },

        tabBarStyle: {
          // shadowOffset: {
          //   width: 0,
          //   height: 12
          // },
          // shadowOpacity: 0.58,
          // shadowRadius: 16.0,
          // position: 'absolute',
          // bottom: 15,
          // // rounded: 'full',
          // left: 20,
          // right: 20,
          // elevation: 24,
          // borderRadius: 100,
          // height: 70,
          // backgroundColor: '#050531',
          // borderTopColor: '#050531',
          // alignItems: 'center',
          // justifyContent: 'center'

          // shadowOffset: {
          //   width: 0,
          //   height: 12
          // },
          // shadowOpacity: 0.58,
          // shadowRadius: 16.0,
          position: 'absolute',
          // bottom: 15,
          // rounded: 'full',
          // left: 20,
          // right: 20,
          // elevation: 24,
          // borderRadius: 100,
          height: 100,
          // backgroundColor: '#050531',
          // borderTopColor: '#050531',

          alignItems: 'center',
          justifyContent: 'center'

          //shadow
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
                    // color: '#ffffff',
                    // opacity: focused ? 1 : 0.6
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
                    // color: '#ffffff',
                    // opacity: focused ? 1 : 0.6
                    color: focused ? '#0065FF' : '#404040'
                  }}
                />
              );
              break;
          }

          return (
            <View className="items-center justify-center ">
              {icon}
              {/* <Text
                className={`text-white
                    ${focused ? 'opacity-100' : 'opacity-60'}
              font-title`}>
                {route.name}
              </Text> */}
            </View>
          );
        }
      })}>
      <BottomTabs.Screen
        name="Journal"
        component={Journal}
        options={{
          headerTitle: (props) => <></>,

          headerLeft: (props) => (
            <DateHeader name="ass" date="upmyAss" {...props} />
          )
        }}
      />
      <BottomTabs.Screen name="Analysis" component={Analysis} />
      <BottomTabs.Screen name="Profile" component={Profile} />
    </BottomTabs.Navigator>
  );
}
