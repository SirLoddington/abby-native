import { Button, View, Text, Image } from 'react-native';

// { title }: { title: string }
export default function Header({ name }: { name: string }) {
  //   const logo = require('../assets/images/logo/transparent100x100.png');
  //   const logo = require('../assets/images/logo/transparent200x200.gif');
  //   const logo = require('../assets/images/logo/transparent100x100.png');
  // const img = require('../assets/transparent200x200.gif');

  return (
    <View className="bg-blue flex flex-row justify-between items-center">
      <View className="flex flex-row">
        {/* <Image className="h-5 w-5" source={img} /> */}
        <Text className="text-blue font-title font-bold">AbbyHealth</Text>
      </View>
      <Text>{name}</Text>
    </View>
  );
}
