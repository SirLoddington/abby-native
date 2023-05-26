import { useQuery } from 'react-query';
import { DateTime } from 'luxon';
import _ from 'lodash';
import { getJournalDetails, getAllInsights } from '../services';

export default function userJournalReportData(journalId) {
  const { isLoading: journalDetailLoading, data: journalDetailsData } =
    useQuery(['journalDetails', journalId], () => getJournalDetails(journalId));

  const { data: allInsights, isLoading: allInsightsLoading } = useQuery(
    ['allInsights'],
    async () => await getAllInsights()
  );

  const loading = journalDetailLoading || allInsightsLoading;

  if (loading) {
    return { loading };
  }

  const journalEntry = journalDetailsData.data.journalEntry;

  // Include the associated insight (from s3 source of truth) with each classification
  journalEntry.classifications = _.compact(
    journalEntry.classifications.map((c) => {
      return (
        c.present && {
          ...c,
          insight: allInsights?.find((ins) => ins.code == c.classification)
        }
      );
    })
  );

  // Include the associated insight (from s3 source of truth) with each package
  journalEntry.packages = _.compact(
    journalEntry.packages.map(
      (p) =>
        p.issue && {
          ...p,
          insight:
            p.issue && allInsights.find((ins) => ins.code == p.issue.issueCode)
        }
    )
  );

  const nonSymptomInsights = journalEntry.classifications.filter(
    (ins) => ins.type !== 'symptom'
  );

  const symptomInsights = journalEntry.classifications.filter(
    (ins) => ins.type == 'symptom'
  );

  const mentalHealthThemes = journalEntry.mental_health_themes;

  const hasInvestigation = journalEntry.packages.length > 0;
  const completedInvestigation = journalEntry.completed_investigation;
  const createdDate = DateTime.fromISO(journalEntry.createdAt);
  const triageReasons = journalDetailsData.data.triageReasons;
  //   const packages = journalEntry.packages;
  const totalInsights =
    (symptomInsights?.length || 0) +
    (nonSymptomInsights?.length || 0) +
    (journalEntry?.mental_health_themes?.length || 0);
  //   const progress = packages
  //     ? packages.filter((pkg) => pkg.isCompleted).length / packages.length
  //     : 0;

  //Add data from matching insight to each issue
  const issuesBare = journalEntry.issues;
  const issues = issuesBare.map((issue) => {
    const insight = allInsights?.find((insight) => {
      return insight.code === issue.issueCode;
    });
    //Add all the data from the insight to the issue
    return { ...issue, ...insight };
  });

  return {
    loading,
    journalEntry,
    nonSymptomInsights,
    totalInsights,
    triageReasons,
    mentalHealthThemes,
    issues,
    hasInvestigation,
    completedInvestigation,
    createdDate
    // symptomInsights,
    // progress,
  };
}
