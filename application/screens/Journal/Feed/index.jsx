import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, Image } from 'react-native';
import { useQuery } from 'react-query';

import _ from 'lodash';
import { DateTime } from 'luxon';
import { getFeed } from '../../../../services';

import JournalEntryMini from './JournalEntryMini';
import JournalPrompt from './JournalPrompt';
import DateHeader from '../../../headers/DateHeader';

import FeedDateHeader from './FeedDateHeader';

import { useNavigation } from '@react-navigation/native';

export default function JournalHistory() {
  const dog = require('../../../../assets/images/walking_dog.png');
  const navigation = useNavigation();
  const [feedData, setFeedData] = useState([
    { type: 'journalHere' },
    { type: 'journalPrompt' }
  ]);

  const [to, setTo] = useState(null);
  const [from, setFrom] = useState(null);
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <DateHeader date={to} />
    });
  }, []);

  const { data, isLoading } = useQuery(['weekly-feed', { from, to }], () =>
    getFeed({ from, to })
  );

  useEffect(() => {
    if (data) {
      const journalEntries = data?.data?.map((entry) => {
        return {
          type: 'journalEntry',
          journal: entry
        };
      });

      if (journalEntries.length === 0) {
        setFeedData((curr) => [...curr, { type: 'noJournals', to }]);
      } else {
        setFeedData((curr) => [...curr, ...journalEntries]);
      }
    }
  }, [data]);

  //Needs to defend against if they didnt journal in this week.
  //Maybe check data then call again? but make sure if they just signed up it didnt infinitely proc
  //Also the the first time it loads is getting skipped (because onEndReached is called before the data is loaded maybe?)
  function getNextWeek() {
    if (!to || !from) {
      const newTo = new Date();
      setTo(newTo.toISOString());
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 7);
      setFrom(twoWeeksAgo.toISOString());
    } else {
      const newTo = new Date(to);
      const newFrom = new Date(from);

      newTo.setDate(newTo.getDate() - 7);
      newFrom.setDate(newFrom.getDate() - 7);
      setTo(newTo.toISOString());
      setFrom(newFrom.toISOString());
    }
  }

  function renderItem(item) {
    switch (item.type) {
      case 'journalHere':
        return (
          <Pressable
            className="pt-20 pb-40"
            onPress={() => navigation.navigate('Journalling')}>
            <Text className="font-userText text-black opacity-40 text-4xl">
              Tap to journal...
            </Text>
          </Pressable>
        );
      case 'journalPrompt':
        return (
          <View className="border-b pb-10 border-opacity-10">
            <JournalPrompt />
          </View>
        );
      case 'journalEntry':
        return <JournalEntryMini journal={item.journal} />;

      //currently not working and not used
      case 'feedDateHeader':
        return <FeedDateHeader from={item.from} to={item.to} />;

      case 'noJournals':
        return (
          <View
            className="flex flex-col justify-center items-center space-y-4 border-b pb-4 pt-4" //flex-1
            id={item.to}>
            <Text className=" w-full text-start font-userText">
              {DateTime.fromISO(item.to).toFormat('cccc, dd LLL')}
            </Text>
            <Image source={dog} style={{ width: 200, height: 200 }} />
            <Text className="font-userText text-black opacity-40 text-xl">
              You didn't journal this week...
            </Text>
          </View>
        );

      default:
        return null;
    }
  }

  return (
    <FlatList
      className="flex-1 bg-white px-6"
      data={feedData}
      renderItem={({ item, index }) => {
        return renderItem(item);
      }}
      onEndReached={() => {
        getNextWeek();
      }}
      decelerationRate={'fast'}
    />
  );
}
