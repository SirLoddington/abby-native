import { View, Text } from 'react-native';

export default function Box({ title, colour, children }) {
  // text-[#003CD6]

  const colourMap = {
    blue: { bg: 'bg-[#0065ff10]', text: 'text-blue' },
    orange: { bg: 'bg-[#C8600010]', text: 'text-[#C86000]' },
    purple: { bg: 'bg-[#7f00ff10]', text: 'text-[#7f00ff]' }
  };
  return (
    <View
      className={`${colourMap[colour].bg} flex-1 rounded-2xl p-6 flex flex-col space-y-4`}>
      <Text className={`${colourMap[colour].text} font-title text-xl`}>
        {title}
      </Text>
      {children}
    </View>
  );
}
