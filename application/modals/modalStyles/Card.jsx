import Modal from 'react-native-modal';

import { Button, Text, View } from 'react-native';

export default function CardModal({
  isOpen,
  setIsOpen,
  colour = 'white',
  children = <></>,
  ...props
}) {
  const colourMap = {
    white: {
      containerStyle: 'bg-white',
      textStyle: 'text-black'
    }
  };

  return (
    <Modal
      isVisible={isOpen}
      onBackdropPress={() => setIsOpen(false)}
      {...props}>
      <View
        className={`rounded-xl h-full p-4 flex ${colourMap[colour]?.containerStyle}`}>
        {children}
      </View>
    </Modal>
  );
}
