import React from 'react';
import { SafeAreaView, StyleSheet, TextInput } from 'react-native';

export default function TextEditor({ text, onChangeText }) {
  return (
    <SafeAreaView>
      <TextInput
        onChangeText={onChangeText}
        value={text}
        multiline={true}
        placeholder="Type here"
        className="font-userText
          p-4
          text-2xl
        "
      />
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   input: {
//     height: 400,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//     //rounded corners
//     borderRadius: 10,
//     textAlignVertical: 'top',
//     textAlign: 'left',
//     fontSize: 20,
//     overflow: 'scroll',
//     //text wrapping
//     flexWrap: 'wrap',
//     //text needs to go onto next line while typing
//     flexShrink: 1
//   }
// });
