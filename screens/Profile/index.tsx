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
  BottomTabScreenProps<BottomTabsParamList, 'Profile'>,
  StackScreenProps<RootStackParamList>
>;

//
export default function Profile({ route, navigation }: Props) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>This is the profile page</Text>
      <Button onPress={() => navigation.goBack()} title="Go back" />

      <Button
        onPress={() => navigation.navigate('MedicalTeam')}
        title="Medical Team"
      />
      <Button
        onPress={() => navigation.navigate('MedicalHistory')}
        title="Medical History"
      />
      <Button
        onPress={() => navigation.navigate('Personal')}
        title="Personal"
      />
      <Button
        onPress={() => navigation.navigate('Lifestyle')}
        title="Lifestyle"
      />
    </View>
  );
}
