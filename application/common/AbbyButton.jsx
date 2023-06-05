import React from 'react';
import { Pressable, View, Text } from 'react-native';

export default function AbbyButton({
  pressFunction = () => {},
  colour = 'blue',
  shapeStyle = 'rounded',
  size = 'medium',
  text = 'Submit',
  className = ''
}) {
  const colourMap = {
    white: {
      primary: {
        container: 'border-[#0065FF] bg-[#FFFFFF]',
        text: 'text-[#0065FF]'
      },
      secondary: {
        container: 'border-[#0065FF] bg-[#0065FF]',
        text: 'text-[#FFFFFF]'
      }
    },
    blue: {
      primary: {
        container: 'border-[#0065FF] bg-[#0065FF]',
        text: 'text-[#FFFFFF]'
      },
      secondary: {
        container: 'border-[#0065FF] bg-[#0065FF] shadow-xl',
        text: 'text-[#FFFFFF]'
      }
    }
  };

  const shapeMap = {
    rounded: 'rounded-full border-2',
    box: 'border-2 rounded-lg',
    text: 'border-0 '
  };

  const sizeMap = {
    small: 'px-2 py-1 text-lg',
    medium: 'px-4 py-2 text-xl',
    large: 'px-6 py-3 text-2xl'
  };

  return (
    <Pressable onPress={() => pressFunction()} className="items-center">
      {({ pressed }) => (
        <View
          className={` justify-center items-center
          ${shapeMap[shapeStyle]} ${
            pressed
              ? colourMap[colour].secondary.container
              : colourMap[colour].primary.container
          } 
          ${className}`}>
          <Text
            className={` px-4 py-2 font-title
            ${sizeMap[size]}
            ${
              pressed
                ? colourMap[colour].secondary.text
                : colourMap[colour].primary.text
            }`}>
            {text}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
