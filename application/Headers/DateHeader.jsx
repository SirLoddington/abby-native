import { View, Text } from 'react-native';

import LiveClock from './LiveClock';

export default function DateHeader(props) {
  return (
    <View className="ml-2">
      <Text className="font-userText text-sm">
        <LiveClock />
      </Text>
    </View>
  );
}
