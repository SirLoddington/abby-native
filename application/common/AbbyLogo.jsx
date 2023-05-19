import { View, Text, Image } from 'react-native';

const sizeGuide = {
  xs: {
    image: 'h-2',
    text: 'text-xs'
  },
  small: {
    image: 'h-5 w-5',
    text: 'text-sm'
  },
  normal: {
    image: 'h-7 w-7',
    text: 'text-base'
  },
  large: {
    image: 'h-10 w-10',
    text: 'text-xl'
  },
  massive: {
    image: ' h-28 w-28',
    text: 'text-2xl'
  }
};

export function AbbyLogo({
  size = 'normal',
  className = '',
  showText = true,
  leftMargin = true,
  staticImage = false
}) {
  const logo = require('../../assets/transparent200x200.gif');
  const staticLogo = require('../../assets/transparent100x100.png');

  return (
    <View className={`shrink-0 flex flex-row items-center ${className}`}>
      <Image
        source={staticImage ? staticLogo : logo}
        alt="Abby Logo"
        className={`${sizeGuide[size].image} ${leftMargin && 'ml-3'}`}
      />
      {showText && (
        <Text
          className={`${sizeGuide[size].text} ml-1 text-base font-semibold text-blue-link text-opacity-80`}
          style={{ letterSpacing: -0.06 }}>
          Abby Health
        </Text>
      )}
    </View>
  );
}
