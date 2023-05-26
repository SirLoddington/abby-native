import { Button, View, Text } from 'react-native';
import { useQuery } from 'react-query';

//Typing for NestedTabs
// import type {
//   RootStackParamList,
//   BottomTabsParamList
// } from '../../NavigationTypes';
// import type { CompositeScreenProps } from '@react-navigation/native';
// import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
// import type { StackScreenProps } from '@react-navigation/stack';
// type Props = CompositeScreenProps<
//   BottomTabScreenProps<BottomTabsParamList, 'Journal'>,
//   StackScreenProps<RootStackParamList>
// >;

import Feed from './Feed';

import { getToken } from '../../../services/tokenStorage';

// : Props
export default function Journal({ route, navigation }) {
  // console.log('journals', journals.length);

  //A promise is returned from getToken
  const token = getToken('test');
  console.log('token');
  console.log(token);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="font-title text-blue text-4xl">Journal ya dawg</Text>
      <Text className="font-title text-blue text-4xl">Token: </Text>
      <Button
        onPress={() => navigation.navigate('Journalling')}
        title="Journal Now"
      />
      <Feed />
    </View>
  );
}
