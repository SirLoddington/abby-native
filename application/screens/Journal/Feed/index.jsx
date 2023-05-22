import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useQuery } from 'react-query';
import _ from 'lodash';
import { getFeed } from '../../../../services';

import JournalEntry from './JournalEntry';

export default function JournalHistory() {
  const from = '2023-04-08T00:00:00.000+10:00';
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

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          flexDirection: 'column'
          // marginVertical: 24,
          // marginHorizontal: 16
          //y-spacing 10
        }}
        className="ml-4 mr-4 flex flex-col space-y-2">
        {/* style={{ flex: 1, flexDirection: 'column', marginVertical: 24 }}> */}
        {journals?.map((j, i) => {
          return <JournalEntry key={i} journal={j} />;
        })}
      </View>
    </ScrollView>
  );
}
