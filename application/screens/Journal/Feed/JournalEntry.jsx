import { Text, View, Pressable } from 'react-native';

import { DateTime } from 'luxon';
import { useNavigation } from '@react-navigation/native';

export default function JournalEntry({ journal }) {
  const createdDate = DateTime.fromISO(journal.createdAt);
  const navigation = useNavigation();
  console.log(journal);
  return (
    <Pressable
      onPress={() => {
        navigation.push('JournalPage', {
          journalID: journal.id
        });
      }}>
      <View className="flex flex-col space-y-2 border-2 border-black mt-2">
        <Text>{createdDate?.toFormat('cccc, dd LLL h:mm a')}</Text>
        <Text className="">{journal.journal_text}</Text>
      </View>
    </Pressable>
  );
}
