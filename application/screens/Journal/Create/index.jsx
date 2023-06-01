import { View, Text } from 'react-native';

import { useState } from 'react';

import TextEditor from './TextEditor';
import AbbyButton from '../../../common/AbbyButton';

import useCreateJournal from '../../../../hooks/useCreateJournal';

import ConfirmationCard from './ConfirmationCard';

export default function Create({ route, navigation }) {
  const [text, onChangeText] = useState(
    'Try journalling about how ur nuts smell'
  );

  const [journalID, setJournalId] = useState(null);

  const { onSubmit } = useCreateJournal(text, journalID, setJournalId);

  const [showConfirmation, setShowConfirmation] = useState(false);

  function handleOnSubmit() {
    setShowConfirmation(true);
    console.log('analysing');
    onSubmit();
  }

  return (
    <>
      <ConfirmationCard
        journalID={journalID}
        isOpen={showConfirmation}
        setIsOpen={setShowConfirmation}
      />
      <View className=" bg-white flex-1 ">
        <Text>New journal entry</Text>
        <TextEditor text={text} onChangeText={onChangeText} />
        <AbbyButton
          text="Anal-yse"
          shapeStyle="box"
          pressFunction={() => {
            handleOnSubmit();
          }}
        />
      </View>
    </>
  );
}
