import { View, Text } from 'react-native';

// import { HiDocument, HiEye, HiPencil } from 'react-icons/hi';

import {
  DocumentIcon,
  EyeIcon,
  PencilIcon
} from 'react-native-heroicons/solid';

import _ from 'lodash';
import { useQuery } from 'react-query';
import { getJournalHistory, getInsightsForUser } from '../../../services';

export default function JournalStats() {
  const { data: journalsData } = useQuery(['journals'], () => {
    return getJournalHistory({
      //   from: dateRange?.from.toISO(),
      //   to: dateRange?.to.toISO()
    });
  });

  const { data: insightsData } = useQuery(['insights'], () => {
    return getInsightsForUser({
      //   from: dateRange?.from.toISO(),
      //   to: dateRange?.to.toISO()
    });
  });

  const journalEntries = journalsData?.data?.journalEntries;
  const insights = insightsData?.data?.insights;

  //get the total word count for all journal entries
  const wordCount = journalEntries?.reduce((acc, curr) => {
    return acc + _.words(curr.journal_text).length;
  }, 0);

  const elements = [
    { Icon: DocumentIcon, stat: journalEntries?.length, name: 'Entries' },
    { Icon: EyeIcon, stat: insights?.length, name: 'Insights' },
    { Icon: PencilIcon, stat: wordCount, name: 'Word count' }
  ];

  return (
    <View className="w-full">
      <View style={{ marginVertical: 24 }}>
        <Text className="font-title text-2xl">Journal Stats</Text>
        <View className="flex flex-row justify-between">
          {elements.map(({ Icon, stat, name }, i) => (
            <View key={`stat${i}`} style={{ flex: 1 }}>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                <Icon style={{ color: '#0065FF', width: 24, height: 24 }} />
                <Text style={{ fontSize: 30, lineHeight: 36 }}>{stat}</Text>
              </View>
              <Text
                style={{
                  paddingLeft: 32,
                  paddingTop: 2,
                  fontFamily: 'font-title'
                }}>
                {name}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
