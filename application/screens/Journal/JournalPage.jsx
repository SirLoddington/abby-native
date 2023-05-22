import { View, Text, Pressable } from 'react-native';

export default function JournalPage({ route, navigation }) {
  const jid = route.params?.journalID;

  return (
    <View>
      <Text>Journal page for journalID {jid}</Text>
    </View>
  );
}
