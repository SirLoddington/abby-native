import { Button, View, Text } from 'react-native';

//Typing for Tabs
// import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
// import type { BottomTabsParamList } from '../../NavigationTypes';
// type Props = BottomTabScreenProps<
//   BottomTabsParamList,
//   'Analysis',
//   'BottomTabs'
// >;

//Typing for NestedTabs
import type {
  RootStackParamList,
  BottomTabsParamList
} from '../../../NavigationTypes';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { StackScreenProps } from '@react-navigation/stack';
type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabsParamList, 'Analysis', 'BottomTabs'>,
  StackScreenProps<RootStackParamList>
>;

import { AbbyLogo } from '../../common/AbbyLogo';

export default function Analysis({ route, navigation }: Props) {
  const jid = route.params?.jid;
  return (
    <View className="bg-white flex-1 justify-center items-center">
      <Text>This is the Journal analysis page for journal {jid}</Text>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
      <AbbyLogo />
    </View>
  );
}
