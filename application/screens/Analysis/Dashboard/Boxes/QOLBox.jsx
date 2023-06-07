import QOLGraph from '../Graphs/QOLGraph';

import Box from './Box';
import useQOLData from '../hooks/useQOLData';
export default function QOLBox({ dateRange }) {
  const { loading, otherInsights } = useQOLData({ dateRange });
  if (loading) {
    return null;
  }
  return (
    <Box title={'Symptoms identified'} colour={'orange'}>
      <QOLGraph nonSymptomInsights={otherInsights} />
    </Box>
  );
}
