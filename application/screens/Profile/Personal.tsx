import { ImageBackground, Button, View, Text } from 'react-native';

import { RootStackParamList } from '../../../NavigationTypes';
import { StackScreenProps } from '@react-navigation/stack';
type Props = StackScreenProps<RootStackParamList, 'Personal'>;

export default function Personal({ route, navigation }: Props) {
  const image = {
    uri: 'https://docs.expo.dev/static/images/tutorial/splash.png'
  };
  return (
    <View className="flex-1 items-center justify-center">
      <ImageBackground source={image} resizeMode="cover">
        <Text className="bg-white">This is the personal page</Text>
        <Button onPress={() => navigation.goBack()} title="Go back" />
      </ImageBackground>
    </View>
  );
}
