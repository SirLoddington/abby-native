import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  FlatList,
  Pressable
} from 'react-native';
import { useQuery } from 'react-query';

import _ from 'lodash';
import { getFeed } from '../../../../services';

import JournalEntryMini from './JournalEntryMini';
import JournalPrompt from './JournalPrompt';
import DateHeader from '../../../Headers/DateHeader';

import { useNavigation } from '@react-navigation/native';

export default function JournalHistory() {
  const navigation = useNavigation();
  const [feedData, setFeedData] = useState([
    { type: 'journalHere' },
    { type: 'journalPrompt' }
  ]);

  const [to, setTo] = useState(null);
  const [from, setFrom] = useState(null);
  useEffect(() => {
    // console.log('proc!');
    // setTo(new Date().toISOString());
    // const twoWeeksAgo = new Date();
    // twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    // setFrom(twoWeeksAgo.toISOString());
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
      // const journals = events?.filter((event) => {
      //   return event.type === 'journalEntry';
      // });
      setFeedData((curr) => [...curr, ...journalEntries]);
    }
  }, [data]);

  //Needs to defend against if they didnt journal in this week.
  //Maybe check data then call again? but make sure if they just signed up it didnt infinitely proc
  //Also the the first time it loads is getting skipped because onEndReached is called before the data is loaded
  function getNextWeek() {
    console.log('getNextWeek');

    // while (isLoading) {
    //   // console.log('waiting for data...');
    // }

    if (!to || !from) {
      console.log("initialising to today's date");
      const newTo = new Date();
      setTo(newTo.toISOString());
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 7);
      setFrom(twoWeeksAgo.toISOString());
      //wait 5 seconds for the data to load
      console.log('init to', to);
      console.log('init from', from);

      // setTimeout(() => {}, 5000);
    } else {
      const newTo = new Date(to);
      const newFrom = new Date(from);

      newTo.setDate(newTo.getDate() - 7);
      newFrom.setDate(newFrom.getDate() - 7);
      console.log('newTo', newTo);
      console.log('newFrom', newFrom);
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

      default:
        return null;
    }
  }

  return (
    <FlatList
      className="flex-1 bg-white px-6"
      data={feedData}
      renderItem={({ item, index }) => renderItem(item)}
      onEndReached={() => {
        console.log('onEndReached');
        getNextWeek();
      }}
      decelerationRate={'fast'}
    />
  );
}
