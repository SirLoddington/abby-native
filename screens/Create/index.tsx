import { Button, View, Text } from 'react-native';

//Typing for NestedTabs
import type {
  RootStackParamList,
  BottomTabsParamList
} from '../../NavigationTypes';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { StackScreenProps } from '@react-navigation/stack';
type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabsParamList, 'Create', 'BottomTabs'>,
  StackScreenProps<RootStackParamList>
>;

export default function Create({ route, navigation }: Props) {
  return (
    <View>
      <Text>This is the Create Journal page</Text>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}
