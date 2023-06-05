import { View, Text } from 'react-native';

import LiveClock from '../common/LiveClock';

export default function DateHeader(props) {
  return (
    <View className="ml-2">
      <Text className="font-userText text-sm">
        <LiveClock classStyle="text-xl" />
      </Text>
    </View>
  );
}
