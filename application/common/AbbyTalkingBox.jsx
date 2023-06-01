import { Image, Text, View } from 'react-native';

import useUser from '../../hooks/useUser';

export default function AbbyTalkingBox({ message }) {
  const logo = require('../../assets/transparent200x200.gif');

  const user = useUser();
  return (
    <View
      className="flex flex-col items-center justify-center bg-white p-6
        rounded-2xl shadow-xl w-full
        ">
      <Image
        source={logo}
        style={{
          width: 60,
          height: 60,
          alignSelf: 'flex-start'
        }}
      />
      <View className="px-10 flex flex-col space-y-2">
        <Text className="font-sans text-black text-xl ">Hi {user?.name}</Text>

        <Text className="font-sans text-black text-xl leading-7">
          {message} Also make sure to think about cock and balls
        </Text>
      </View>
    </View>
  );
}
