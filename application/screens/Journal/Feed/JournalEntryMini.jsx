import { Text, View, Pressable } from 'react-native';

import { DateTime } from 'luxon';
import { useNavigation } from '@react-navigation/native';

export default function JournalEntry({ journal }) {
  const createdDate = DateTime.fromISO(journal?.createdAt);
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.push('JournalPage', {
          journalID: journal?.id
        });
      }}>
      <View className="flex flex-col space-y-2 border-b border-black border-opacity-10 pb-4 my-8">
        <Text className="font-userText">
          {createdDate?.toFormat('cccc, dd LLL h:mm a')}
        </Text>
        <Text className="font-userText">
          <Text className="text-4xl">
            {journal?.journal_text && journal?.journal_text[0]}
          </Text>
          <Text className="text-xl">{journal?.journal_text?.substring(1)}</Text>
        </Text>
      </View>
    </Pressable>
  );
}
