import { ImageBackground, Button, View, Text, StyleSheet } from 'react-native';

import { RootStackParamList } from '../../../NavigationTypes';
import { StackScreenProps } from '@react-navigation/stack';
type Props = StackScreenProps<RootStackParamList, 'Personal'>;

export default function Personal({ route, navigation }: Props) {
  const image = {
    uri: 'https://docs.expo.dev/static/images/tutorial/splash.png'
  };

  const styles = StyleSheet.create({
    container: {
      // flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'red',
      borderWidth: 2
      // height: 100
    },
    box: {
      // alignSelf: 'flex-start',
      // flex: undefined,
      borderWidth: 1,
      padding: 10,
      backgroundColor: 'blue'
    }
  });

  return (
    <View className="flex-1 items-center justify-center">
      <ImageBackground source={image} resizeMode="cover">
        <View className="flex-1 items-center justify-center">
          <Text>Personal</Text>
          <Text>Testing</Text>

          <View style={styles.container}>
            <View style={styles.box}>
              <Text>Hello, World!</Text>
            </View>
          </View>
        </View>
        <Button onPress={() => navigation.goBack()} title="Go back" />
      </ImageBackground>
    </View>
  );
}
