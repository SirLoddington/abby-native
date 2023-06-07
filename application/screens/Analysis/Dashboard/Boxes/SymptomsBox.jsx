import SymptomBurdenGraphic from '../Graphs/SymptomBurdenGraphic';

import Box from './Box';
export default function SymptomsBox({ dateRange }) {
  // text-[#003CD6]
  return (
    <Box title={'Symptoms identified'} colour={'blue'}>
      <SymptomBurdenGraphic dateRange={dateRange} />
    </Box>
  );
}
