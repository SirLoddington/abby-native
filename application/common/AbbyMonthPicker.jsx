import { View, Text, Pressable } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import useUser from '../../hooks/useUser';

import { DateTime } from 'luxon';

import {
  ChevronRightIcon,
  ChevronLeftIcon
} from 'react-native-heroicons/solid';

import { useState, useRef, useEffect } from 'react';

export default function AbbyDatePicker({ dateRange, setDateRange }) {
  const LAST30INDEX = 11;

  const [currIndex, setCurrIndex] = useState(null);

  const user = useUser();

  const [entries, setEntries] = useState([]);

  const carouselRef = useRef(null);

  useEffect(() => {
    if (currIndex !== null) {
      setDateRange({
        from: entries[currIndex].from,
        to: entries[currIndex].to
      });
    }
  }, [currIndex]);

  useEffect(() => {
    if (user) {
      setEntries([
        {
          title: 'All time',
          to: DateTime.now(),
          from: DateTime.fromISO(user.createdAt)
        },
        {
          title: 'Last 30 Days',
          to: DateTime.now(),
          from: DateTime.now().minus({ days: 30 })
        }
      ]);
      //Add the last 12 months, excluding this month
      for (let i = 1; i < 12; i++) {
        // const newDate = new Date();
        // const month = newDate.getMonth() - i;
        // const year = newDate.getFullYear();
        // const monthFrom = new Date(year, month, 1);
        // const monthTo = new Date(year, month + 1, 1);
        //using luxon datetimes
        const monthFrom = DateTime.now().minus({ months: i }).set({ day: 1 });
        const monthTo = DateTime.now()
          .minus({ months: i - 1 })
          .set({ day: 1 });

        setEntries((entries) => [
          ...entries,
          {
            title: `${monthFrom.toFormat('MMMM')}`,
            to: monthTo,
            from: monthFrom
          }
        ]);
      }
      //reverse the array
      setEntries((entries) => entries.reverse());
      //12 months, next item will be the last 30 days
      setCurrIndex(LAST30INDEX);
      // carouselRef.current.snapToItem(entries.length - 2);
    }
  }, [user]);

  const renderItem = ({ item, index }) => {
    return (
      <Pressable
        className="items-center justify-center flex-row"
        onPress={() => {
          setCurrIndex(index);
          carouselRef.current.snapToItem(index);
        }}>
        <View className="items-center justify-center flex-row z-100">
          <View
            // ${index === currIndex ? 'border-blue border-2 ' : ''}
            className={`
            rounded-full p-2 px-4 bg-transparent
            justify-center items-center
            `}>
            <Text
              // ${index === currIndex ? 'text-blue' : 'text-black'}
              className={`
              font-title text-xl`}>
              {item.title}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const sliderWidth = 400;
  const itemWidth = 150;

  if (!user) return <Text>Loading...</Text>;

  return (
    <View className="w-full items-center">
      <View className="self-center w-1/2 absolute top-0 bottom-0 mx-auto my-auto bg-transparent flex flex-row items-center">
        <Pressable
          className={` ${currIndex === 0 && 'opacity-0'}`}
          onPress={() => carouselRef.current.snapToPrev()}>
          <ChevronLeftIcon className="w-6 h-6" />
        </Pressable>
        <View className="flex-1 h-full rounded-full border-2 border-blue bg-transparent"></View>
        <Pressable
          onPress={() => carouselRef.current.snapToNext()}
          className={` ${currIndex === LAST30INDEX + 1 && 'opacity-0'}`}>
          <ChevronRightIcon className={`w-6 h-6`} />
        </Pressable>
      </View>
      <Carousel
        ref={carouselRef}
        data={entries}
        renderItem={renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10
        }}
        //Start on the second last item
        // firstItem={entries.length - 2}

        // initialScrollIndex={entries.length - 2}
        onSnapToItem={(index) => setCurrIndex(index)}
        // initialScrollIndex={12}
        firstItem={LAST30INDEX}
      />
    </View>
  );
}
