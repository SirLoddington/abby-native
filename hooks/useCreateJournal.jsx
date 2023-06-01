import {
  createJournalEntry,
  classify,
  classifyMedication,
  classifyMentalHealth,
  classifyADLs
} from '../services';
import { useQueryClient, useMutation } from 'react-query';

function retry(fn, retries = 3, err = null, delay = 200) {
  if (!retries) {
    return Promise.reject(err);
  }
  return fn().catch(async (err) => {
    await new Promise((resolve) => setTimeout(resolve, delay));
    return retry(fn, retries - 1, err, delay + 200);
  });
}
export default function useCreateJournal(text, journalID, setJournalID) {
  const updateOrCreateEntry = async () => {
    let jid = journalID;
    if (text.length > 0) {
      //   if (journalID) {
      //     const res = await updateJournalEntry(text, journalID, inputHtml);
      //     jid = res.data.id;
      //     setJournalId(jid);
      //     setJournalDate(DateTime.fromISO(res.data.createdAt));
      //   } else {

      //PUT THIS IN A TRY CATCH BLOCK
      // const res = await createJournalEntry(text, text); //inputHtml -> text
      // jid = res.data.id;
      // setJournalID(jid);

      try {
        const res = await createJournalEntry(text, text); //inputHtml -> text
        jid = res.data.id;
        setJournalID(jid);
      } catch (err) {
        console.log("couldn't create journal entry");
        console.log(err);
      }

      //   setJournalDate(DateTime.fromISO(res.data.createdAt));
      //   }
    }
    return jid;
  };

  // const queryClient = useQueryClient();
  const analyseJournalMutation = useMutation(
    async (jid) => {
      return await Promise.all([
        retry(() => classify(jid)),
        retry(() => classifyMedication(jid)),
        retry(() => classifyADLs(jid)),
        retry(() => classifyMentalHealth(jid))
      ]);
    },
    {
      onSettled: () => {
        // queryClient.invalidateQueries();
      }
    }
  );

  const onSubmit = async () => {
    const jid = await updateOrCreateEntry();
    analyseJournalMutation.mutate(jid);
  };

  return { onSubmit };
}
