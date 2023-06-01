import useSSE from '../../../../hooks/useSSE';
import { useEffect, useState } from 'react';

import AbbyTalkingBox from '../../../common/AbbyTalkingBox';

export default function JournalPrompt() {
  const [journalPrompt, setJournalPrompt] = useState('');
  const endpoint = 'customText/journal-prompts';
  const {
    data: promptData,
    loading: isLoading,
    isFull: isFull
  } = useSSE({ endpoint });
  useEffect(() => {
    if (promptData && isFull) {
      setJournalPrompt(promptData);
    } else if (promptData) {
      setJournalPrompt((curr) => curr + promptData);
    }
  }, [promptData, isFull]);

  return !isLoading && <AbbyTalkingBox message={journalPrompt} />;
}
