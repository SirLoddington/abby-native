import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
// @ts-ignore
import Modal from 'react-native-modal';

export default function BottomScroll({
  isOpen,
  setIsOpen,
  children = <></>,
  classStyle = '',
  ...props
}) {
  //bg-white if there are no other bg classes
  const bgWhite = !classStyle.includes('bg');

  const scrollViewRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(null);

  const handleOnScroll = (event) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const handleScrollTo = (p) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(p);
    }
  };

  return (
    <Modal
      testID={'modal'}
      isVisible={isOpen}
      onBackdropPress={() => setIsOpen(false)}
      onSwipeComplete={() => setIsOpen(false)}
      swipeDirection={['down']}
      scrollTo={handleScrollTo}
      scrollOffset={scrollOffset}
      scrollOffsetMax={1000}
      propagateSwipe={true}
      className="flex justify-end m-0">
      <View className="h-[40%]">
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleOnScroll}
          scrollEventThrottle={16}
          overScrollMode="always"
          //Use a colourmap?
          className={`${bgWhite && 'bg-white'} p-4 ${classStyle}`}>
          {children}
        </ScrollView>
      </View>
    </Modal>
  );
}
