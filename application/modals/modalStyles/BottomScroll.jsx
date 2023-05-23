import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
// @ts-ignore
import Modal from 'react-native-modal';

export default function BottomScroll({
  isOpen,
  setIsOpen,
  children = <></>,
  ...props
}) {
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
      scrollOffsetMax={400 - 300} // content height - ScrollView height
      propagateSwipe={true}
      style={styles.modal}>
      <View style={styles.scrollableModal}>
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleOnScroll}
          scrollEventThrottle={16}>
          <View style={styles.scrollableModalContent2}>{children}</View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  scrollableModal: {
    height: 500
  },
  scrollableModalContent1: {
    height: 800,
    // backgroundColor: '#87BBE0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollableModalText1: {
    fontSize: 20,
    color: 'white'
  },
  scrollableModalContent2: {
    //height should be minimum possible
    height: 800,
    // maxHeight: 500,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollableModalText2: {
    fontSize: 20,
    color: 'black'
  }
});
