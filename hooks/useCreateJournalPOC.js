import { useQueryClient, useMutation } from 'react-query';
import { useState, useEffect, useRef } from 'react';
import { DateTime } from 'luxon';

import {
  updateJournalEntry,
  createJournalEntry,
  classify,
  classifyMedication,
  classifyMentalHealth,
  classifyADLs
} from '../services';

function retry(fn, retries = 3, err = null, delay = 200) {
  if (!retries) {
    return Promise.reject(err);
  }
  return fn().catch(async (err) => {
    await new Promise((resolve) => setTimeout(resolve, delay));
    return retry(fn, retries - 1, err, delay + 200);
  });
}

export const useCreateJournal = (
  text,
  inputHtml,
  [journalId, setJournalId],
  setJournalDate
) => {
  const [hasSubmitted, setHasSubmitted] = useState(false); // Whether user has submitted diary entry
  const [hasSaved, setHasSaved] = useState(false);

  const submittedRef = useRef(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setHasSaved(false);
  }, [text]);

  // Interval for
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!hasSubmitted && !updateJournalMutation.isLoading)
        updateJournalMutation.mutate();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [inputHtml]);

  useEffect(() => {
    submittedRef.current = hasSubmitted;
  }, [hasSubmitted]);

  // PROBLEM: DONT SEND A CREATE/UPDATE REQUEST IF ALREADY WAITING ON ONE

  const updateOrCreateEntry = async () => {
    let jid = journalId;
    if (text.length > 0) {
      if (journalId) {
        const res = await updateJournalEntry(text, journalId, inputHtml);
        jid = res.data.id;
        setJournalId(jid);
        setJournalDate(DateTime.fromISO(res.data.createdAt));
      } else {
        const res = await createJournalEntry(text, inputHtml);
        jid = res.data.id;
        setJournalId(jid);
        setJournalDate(DateTime.fromISO(res.data.createdAt));
      }
    }
    return jid;
  };

  const updateJournalMutation = useMutation(
    async () => {
      await updateOrCreateEntry();
      setHasSaved(true);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries();
      }
    }
  );

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
        queryClient.invalidateQueries();
      }
    }
  );

  const onSubmit = async () => {
    const jid = await updateOrCreateEntry();
    analyseJournalMutation.mutate(jid);
    setHasSubmitted(true);
  };

  return {
    isSaving: updateJournalMutation.isLoading,
    isClassifying: analyseJournalMutation.isLoading,
    onSubmit,
    hasSaved,
    hasSubmitted,
    setHasSubmitted
  };
};
