import KeepAwake from 'react-native-keep-awake';
import { useState, useEffect } from 'react';

import { Text } from 'react-native';

export default function LiveClock({ date = false, classStyle = '' }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  const time = currentTime;
  //in the format 'dddd h:mm a'
  const timeStr = time.toLocaleString('en-AU', {
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  const dateStr = time.toLocaleString('en-AU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  return (
    <Text className={`font-userText ${classStyle}`}>
      {date ? dateStr : timeStr}
    </Text>
  );
}
