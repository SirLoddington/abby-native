import { Button, View, Text } from 'react-native';
import { useQuery } from 'react-query';

//Typing for NestedTabs
// import type {
//   RootStackParamList,
//   BottomTabsParamList
// } from '../../NavigationTypes';
// import type { CompositeScreenProps } from '@react-navigation/native';
// import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
// import type { StackScreenProps } from '@react-navigation/stack';
// type Props = CompositeScreenProps<
//   BottomTabScreenProps<BottomTabsParamList, 'Journal'>,
//   StackScreenProps<RootStackParamList>
// >;

import { getFeed } from '../../../services';

// : Props
export default function Journal({ route, navigation }) {
  const from = '2023-05-08T00:00:00.000+10:00';
  const to = '2023-05-14T23:59:59.999+10:00';
  const { data, isLoading } = useQuery(['weekly-feed', { from, to }], () =>
    getFeed({ from, to })
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  const events = data?.data;

  const journals = events?.filter((event) => {
    return event.type === 'journalEntry';
  });

  // console.log('journals', journals.length);

  return (
    <View className="flex-1 items-center justify-center bg-blue">
      <Text className="font-title text-white text-4xl">AbbyHealth</Text>
      <Text className="font-title text-white text-4xl">Cumming soon</Text>
      <View>
        <Text>Add to your medical team</Text>
        <Button
          onPress={() => navigation.navigate('MedicalTeam')}
          title="Medical Team"
        />
      </View>

      {journals?.map((j, i) => {
        return (
          <View key={i}>
            <Text>{j.journal_text}</Text>
          </View>
        );
      })}
    </View>
  );
}
