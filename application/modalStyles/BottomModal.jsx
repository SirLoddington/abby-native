import Modal from 'react-native-modal';

import { Button, Text, View } from 'react-native';

//
//  The modals are currently all in different styles i.e. colourmap vs className styling
//  Someone else have a look and pick the best one
//  They should probs be standardised
//

export default function BottomModal({
  isOpen,
  setIsOpen,
  children = <></>,
  ...props
}) {
  return (
    <Modal
      isVisible={isOpen}
      onBackdropPress={() => setIsOpen(false)}
      onSwipeComplete={() => setIsOpen(false)}
      swipeDirection={['up', 'down']}
      className="flex justify-end m-0"
      {...props}>
      <View className="bg-white h-1/2 flex p-4">{children}</View>
    </Modal>
  );
}
