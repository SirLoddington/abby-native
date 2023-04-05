import { Button, View, Text } from 'react-native';

import { RootStackParamList } from '../../NavigationTypes';
import { StackScreenProps } from '@react-navigation/stack';
type Props = StackScreenProps<RootStackParamList, 'MedicalHistory'>;

export default function MedicalHistory({ route, navigation }: Props) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>This is the MedicalHistory page</Text>
      <Button onPress={() => navigation.goBack()} title="Go back" />
    </View>
  );
}
