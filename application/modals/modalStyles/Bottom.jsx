import Modal from 'react-native-modal';

import { Button, Text, View } from 'react-native';

export default function BottomModal({
  isOpen,
  setIsOpen,
  children = <></>,
  ...props
}) {
  //   const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Modal
      isVisible={isOpen}
      onBackdropPress={() => setIsOpen(false)}
      onSwipeComplete={() => setIsOpen(false)}
      swipeDirection={['up', 'down']}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      {...props}>
      <View className="bg-white h-1/2 flex ">{children}</View>
    </Modal>
  );
}
