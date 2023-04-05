import { Button, View, Text } from 'react-native';

import { RootStackParamList } from '../../NavigationTypes';
import { StackScreenProps } from '@react-navigation/stack';
type Props = StackScreenProps<RootStackParamList, 'Lifestyle'>;

export default function Lifestyle({ route, navigation }: Props) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>This is the Lifestyle page</Text>
      <Button onPress={() => navigation.goBack()} title="Go back" />
    </View>
  );
}
