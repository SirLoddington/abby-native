import { useEffect, useState } from 'react';

import useSSE from '../../../../../hooks/useSSE';

export default function useMentalHealthThemes({ dateRange }) {
  const bubbleEndpoint = 'summary/bubble_themes';

  const [bubbleData, setBubbleData] = useState('');
  const [parsedBubbleData, setParsedBubbleData] = useState([]);

  const [queryDateRange, setQueryDateRange] = useState({
    from: dateRange?.from,
    to: dateRange?.to,
    preview: dateRange?.preview
  });

  const { bubbleIsLoading } = useSSE({
    endpoint: bubbleEndpoint,
    queryState: queryDateRange,
    dataCallback: (data) => setBubbleData((curr) => curr + data)
  });

  useEffect(() => {
    if (dateRange) {
      setBubbleData('');
      setQueryDateRange({
        from: dateRange?.from,
        to: dateRange?.to,
        preview: dateRange?.preview
      });
    }
  }, [dateRange]);

  useEffect(() => {
    if (bubbleData) {
      const parsed = bubbleData
        ?.match(/\[[^\]]*\]?/g)
        ?.map((t) => t.trim().replace(/[[\]]/g, ''));
      setParsedBubbleData(parsed);
    }
  }, [bubbleData]);

  return { bubbleData: parsedBubbleData, bubbleIsLoading };
}
