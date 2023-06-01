import AbbyButton from '../../../common/AbbyButton';
import Card from '../../../modals/modalStyles/Card';

import { Text, View } from 'react-native';
import { finishNLP } from '../../../../services';

import { useState, useEffect, useRef } from 'react';

import { useQueryClient, useMutation } from 'react-query';
import { useNavigation } from '@react-navigation/native';

import useSSE from '../../../../hooks/useSSE';

export default function ConfirmationCard({ journalID, isOpen, setIsOpen }) {
  const queryClient = useQueryClient();
  const completeMutation = useMutation(async () => await finishNLP(journalID), {
    onSettled: () => {
      queryClient.invalidateQueries();
    }
  });

  //   const [dotPointSummary, setDotPointSummary] = useState('');
  //   const [parsedSummary, setParsedSummary] = useState([]);

  //   const endpoint = 'summary/one_sentence';

  //   const query = useRef({ journal_id: journalID });
  //   const { isLoading } = useSSE({
  //     endpoint,
  //     queryState: query.current,
  //     dataCallback: (data) => {
  //       setDotPointSummary((curr) => curr + data);
  //     },
  //     isEnabled: journalID !== null
  //   });
  //   console.log('Journal ID: ');
  //   console.log(journalID);
  //   useEffect(() => {
  //     if (dotPointSummary) {
  //       const parsed = dotPointSummary
  //         ?.match(/\[[^\]]*\]?/g)
  //         ?.map((t) => t.trim().replace(/[[\]]/g, ''));
  //       setParsedSummary(parsed);
  //     }
  //   }, [dotPointSummary]);

  const navigation = useNavigation();

  return (
    <Card isOpen={isOpen} setIsOpen={setIsOpen}>
      {false ? (
        <Text>I'm avin a bloody think ay...</Text>
      ) : (
        <View>
          <Text>Heres what ya told me ya fwuarken dawg cun'</Text>
          {/* <Text>{parsedSummary}</Text> */}
          <Text>Journal ID: {journalID}</Text>
          <AbbyButton
            text="Confirm"
            pressFunction={() => {
              completeMutation.mutate();
              setIsOpen(false);
              navigation.push('JournalPage', {
                journalID: journalID
              });
            }}
          />
        </View>
      )}
    </Card>
  );
}
