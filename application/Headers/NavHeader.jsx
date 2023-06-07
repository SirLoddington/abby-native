import { View, Text, Pressable } from 'react-native';

import { BellIcon, Bars3Icon } from 'react-native-heroicons/solid';

import BottomScrollModal from '../modalStyles/BottomScrollModal';

import { useState } from 'react';

export default function NavHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="flex flex-row  space-x-4 mx-4">
      <BottomScrollModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Text>Notifications</Text>
      </BottomScrollModal>
      <Pressable onPress={() => setIsOpen(true)}>
        <BellIcon color="black" opacity={0.8} />
      </Pressable>
    </View>
  );
}
