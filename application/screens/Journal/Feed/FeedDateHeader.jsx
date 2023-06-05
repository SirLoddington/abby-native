import { Text, View } from 'react-native';

export default function FeedDateHeader({ from, to }) {
  //If the
  const now = new Date();

  // const twoWeeksAgo = new Date();
  //     twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 7);

  console.log('feeddateheader');
  console.log('from', from);
  console.log('to', to);

  const isThisWeek = now.getDate() - to <= 7;
  const isLastWeek = now.getDate() - to <= 14;

  //In format d LLLL
  const fromStr = new Date(from).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long'
  });
  const toStr = new Date(to).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long'
  });

  const dateStr = isThisWeek
    ? 'This Week'
    : isLastWeek
    ? 'Last Week'
    : `${toStr} - ${fromStr}`;

  return (
    <View className="flex-1 bg-white border-b border-black">
      <Text className="font-userText text-2xl text-black">{dateStr}</Text>
    </View>
  );
}
