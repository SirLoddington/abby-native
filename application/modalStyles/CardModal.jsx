import Modal from 'react-native-modal';

import { Button, Text, View } from 'react-native';

//
//  The modals are currently all in different styles i.e. colourmap vs className styling
//  Someone else have a look and pick the best one
//  They should probs be standardised
//

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
