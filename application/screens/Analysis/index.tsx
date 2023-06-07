import { Button, View, Text, ScrollView } from 'react-native';

//Typing for Tabs
// import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
// import type { BottomTabsParamList } from '../../NavigationTypes';
// type Props = BottomTabScreenProps<
//   BottomTabsParamList,
//   'Analysis',
//   'BottomTabs'
// >;

//Typing for NestedTabs
import type {
  RootStackParamList,
  BottomTabsParamList
} from '../../../NavigationTypes';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { StackScreenProps } from '@react-navigation/stack';
type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabsParamList, 'Analysis', 'BottomTabs'>,
  StackScreenProps<RootStackParamList>
>;

import { useState, useRef } from 'react';

import AbbyMonthPicker from '../../common/AbbyMonthPicker';
import AbbyCollapsible from '../../common/AbbyCollapsible';
import SymptomsBox from './Dashboard/Boxes/SymptomsBox';
import QOLBox from './Dashboard/Boxes/QOLBox';
import MentalHealthBox from './Dashboard/Boxes/MentalHealthBox';

export default function Analysis({ route, navigation }: Props) {
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null
  });

  const scrollViewRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(null);

  const handleOnScroll = (event: any) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };
  const handleScrollTo = (p: any) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(p);
    }
  };
  return (
    <View className="bg-white flex-1 justify-center items-center">
      <View className="sticky top-0 w-full ">
        <AbbyMonthPicker dateRange={dateRange} setDateRange={setDateRange} />
        <Text className="text-center font-title">
          Ready to collect data between
          {dateRange?.from?.toISO()} - {dateRange?.to?.toISO()}
        </Text>
      </View>
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleOnScroll}
        scrollEventThrottle={16}
        overScrollMode="always"
        className="flex-1 w-full">
        <AbbyCollapsible title="Dashboard">
          {/* <SymptomsBox dateRange={dateRange} /> */}
          {/* <QOLBox dateRange={dateRange} /> */}
          <MentalHealthBox dateRange={dateRange} />
        </AbbyCollapsible>
        <AbbyCollapsible title="Next steps">{}</AbbyCollapsible>
        <AbbyCollapsible title="The Gallery">
          <Text>{'                     .'}</Text>
          <Text>{'                  ╭╮'}</Text>
          <Text>{'                    / /'}</Text>
          <Text>{'                  / /'}</Text>
          <Text>{'                / /'}</Text>
          <Text>{'              / /'}</Text>
          <Text>{'            / /'}</Text>
          <Text>{'          / /'}</Text>
          <Text>{'  ☺ / /'}</Text>
          <Text>{' \\  |  / /'}</Text>
          <Text>{'   ယ'}</Text>
          <Text>{'  /    \\'}</Text>
          {/* <Text>{'   ......'}</Text>
          <Text>{'O |  | O'}</Text>
          <Text>{'    |  |  '}</Text>
          <Text>{'    |  |  '}</Text>
          <Text>{'    |  |  '}</Text>
          <Text>{'    |  |  '}</Text>
          <Text>{'    |_|  '}</Text>
          <Text>{'    ,/  '}</Text>
          <Text>{'    ^.  '}</Text>
          <Text>{'   .~  '}</Text>
          <Text>{'  o~~ '}</Text>
          <Text>{' /o~~o '}</Text>
          <Text>{'~~~~~~ '}</Text> */}
        </AbbyCollapsible>
      </ScrollView>
    </View>
  );
}
