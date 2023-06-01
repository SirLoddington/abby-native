import { View, Text, Pressable } from 'react-native';

import useJournalData from '../../../hooks/useJournalData';

export default function JournalPage({ route, navigation }) {
  const jid = route.params?.journalID;

  const {
    loading,
    journalEntry,
    triageReasons,
    mentalHealthThemes,
    createdDate
  } = useJournalData(jid);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  //turn a datetime into a date

  return (
    <View>
      <Text> {createdDate.toISODate()}</Text>
      <Text>Journal page for journalID {jid}</Text>
      <Text>Journal entry: {journalEntry.journal_text}</Text>
      <Text> Triages: {triageReasons}</Text>
      <Text>
        Themes: {mentalHealthThemes.map((theme) => theme.theme_classification)}
      </Text>
    </View>
  );
}
