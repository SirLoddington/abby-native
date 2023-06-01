import { View, Text } from 'react-native';

export default function Header(props) {
  return (
    <View>
      <Text>
        title{props.title}
        name{props.name}
      </Text>
    </View>
  );
}
