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
  BottomTabScreenProps<BottomTabsParamList, 'Homepage'>,
  StackScreenProps<RootStackParamList>
>;
export default function Homepage({ route, navigation }: Props) {
  return (
    <View className="flex-1 items-center justify-center bg-blue">
      <Text className="font-title text-white text-4xl">AbbyHealth</Text>
      <Text className="font-title text-white text-4xl">Cumming soon</Text>
      <View>
        <Text>Add to your medical team</Text>
        <Button
          onPress={() => navigation.navigate('MedicalTeam')}
          title="Medical Team"
        />
      </View>
    </View>
  );
}
