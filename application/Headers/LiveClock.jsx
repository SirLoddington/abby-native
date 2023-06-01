import KeepAwake from 'react-native-keep-awake';
import { useState, useEffect } from 'react';

import { Text } from 'react-native';

export default function LiveClock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60 * 1000);

    return () => clearInterval(timer);
  }, []);

  const time = currentTime;
  console.log('timeStr', timeStr);
  //in the format 'dddd h:mm a'
  const timeStr = time.toLocaleString('en-AU', {
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  return (
    <>
      {/* <KeepAwake /> */}
      <Text className="font-userText text-xl">{timeStr}</Text>
    </>
  );
}
