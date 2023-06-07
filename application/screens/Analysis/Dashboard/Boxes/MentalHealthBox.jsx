import Box from './Box';

import MentalHealthBubbles from '../Graphs/MentalHealthBubbles';

import useMentalHealthThemes from '../hooks/useMentalHealthThemes';

export default function MentalHealthBox({ dateRange }) {
  const { bubbleData, bubbleIsLoading } = useMentalHealthThemes({ dateRange });

  if (bubbleIsLoading) {
    return <Text>Lowding</Text>;
  }

  //maybe should await the data before constructing graph. Doesnt seem to be good at on the fly stuff

  return (
    <Box title={'Mental health themes'} colour={'purple'}>
      <MentalHealthBubbles bubbleData={bubbleData} />
    </Box>
  );
}
