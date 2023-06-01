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
  return (
    // <ScrollView className="bg-white p-6">
    //   <View className="flex-1 items-center justify-center "></View>
    // </ScrollView>
    <Feed />
  );
}
