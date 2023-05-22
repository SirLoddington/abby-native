import React from 'react';
import { Pressable, View, Text } from 'react-native';

export default function AbbyButton({
  onPress = () => {},
  colour = 'blue',
  shapeStyle = 'rounded',
  size = 'medium',
  text = 'Submit'
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
    textOnly: {}
  };

  return (
    <Pressable>
      {({ pressed }) => (
        <View
          className={`${shapeMap[shapeStyle]} ${
            pressed
              ? colourMap[colour].secondary.container
              : colourMap[colour].primary.container
          } `}>
          <Text
            className={` px-4 py-2 font-title ${
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
