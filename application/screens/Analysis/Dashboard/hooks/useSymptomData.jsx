import { useQuery } from 'react-query';
import { getIssueSummaryForUser } from '../../../../../services';
import { compareTriage } from '../common/compareTriage';

export default function useSymptomData({ dateRange }) {
  const { isLoading: issueSummaryLoading, data: issueSummaryData } = useQuery(
    ['issues-summary', dateRange],
    () =>
      getIssueSummaryForUser(
        { from: dateRange.from.toISO(), to: dateRange.to.toISO() },
        true
      )
  );

  const loading = issueSummaryLoading;
  const symptomIssues = issueSummaryData?.data?.symptomIssues;

  const sortedSymptomIssues = symptomIssues?.sort((a, b) => {
    return compareTriage(a.latestTriage, b.latestTriage);
  });

  return {
    loading,
    sortedSymptomIssues
  };
}
