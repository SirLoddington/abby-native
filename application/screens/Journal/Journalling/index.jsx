import { View, Text } from 'react-native';

import React, { useState } from 'react';

// import { RichTextEditor } from 'react-native-zss-rich-text-editor';

export default function Journalling({ route, navigation }) {
  return (
    <View>
      <Text>Write something or whatever, I dont care</Text>
      {/* <RichTextEditor
        ref={(r) => (this.richtext = r)}
        initialTitleHTML={'Title!!'}
        initialContentHTML={
          'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'
        }
        editorInitializedCallback={() => this.onEditorInitialized()}
      /> */}
    </View>
  );
}
