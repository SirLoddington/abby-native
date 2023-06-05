import { View, Text } from 'react-native';

import { useState } from 'react';

import TextEditor from './TextEditor';
import AbbyButton from '../../../common/AbbyButton';

import useCreateJournal from '../../../../hooks/useCreateJournal';

import ConfirmationCard from './ConfirmationCard';
import LiveClock from '../../../common/LiveClock';

export default function Create({ route, navigation }) {
  const [text, onChangeText] = useState('');

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
      <View className=" bg-white flex-1 flex flex-col  ">
        <LiveClock classStyle="text-2xl" date />
        <TextEditor text={text} onChangeText={onChangeText} />
        <View className="flex-1 self-end absolute bottom-10 right-10">
          <View className="flex-1 flex-row space-x-2 justify-between ">
            <AbbyButton
              text="Exit"
              shapeStyle="rounded"
              colour="white"
              pressFunction={() => {
                navigation.goBack();
              }}
            />
            {text && (
              <AbbyButton
                text="Save"
                shapeStyle="rounded"
                colour="white"
                pressFunction={() => {
                  handleOnSubmit();
                }}
              />
            )}
          </View>
        </View>
      </View>
    </>
  );
}
