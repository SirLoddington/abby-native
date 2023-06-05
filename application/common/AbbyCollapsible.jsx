import Collapsible from 'react-native-collapsible';

import { useState } from 'react';

import { PlusIcon, MinusIcon } from 'react-native-heroicons/solid';

import { Pressable, View, Text } from 'react-native';

export default function AbbyCollapsible({ open = false, children, title }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    //black border
    <View className="w-full px-4 py-4 border-b border-[#00000020]">
      <Pressable onPress={() => setIsCollapsed((curr) => !curr)}>
        <View className="flex flex-row justify-between items-center">
          <Text className="text-2xl font-title">{title}</Text>

          {isCollapsed ? (
            <PlusIcon className="w-8 h-8 text-black black font-black" />
          ) : (
            <MinusIcon className="w-8 h-8" />
          )}
        </View>
      </Pressable>
      <Collapsible
        // renderChildrenCollapsed={false}
        collapsed={isCollapsed}
        // align="bottom"
        style={{
          flex: 1,
          paddingTop: 10
        }}>
        {children}
      </Collapsible>
    </View>
  );
}
