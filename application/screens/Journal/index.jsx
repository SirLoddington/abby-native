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

// : Props
export default function Journal({ route, navigation }) {
  // console.log('journals', journals.length);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="font-title text-blue text-4xl">Journal ya dawg</Text>
      <Button
        onPress={() => navigation.navigate('Journalling')}
        title="Journal Now"
      />
      <Feed />
    </View>
  );
}
