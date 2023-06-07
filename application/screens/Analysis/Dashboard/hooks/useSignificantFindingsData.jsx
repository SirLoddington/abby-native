import { useQuery } from 'react-query';
import { getIssueSummaryForUser } from '../../../../../services';
import _ from 'lodash';

export default function useSignificantFindingsData(dateRange) {
  const { isLoading: issueSummaryLoading, data: issueSummaryData } = useQuery(
    ['issues-summary', dateRange],
    () =>
      getIssueSummaryForUser(
        { from: dateRange.from.toISO(), to: dateRange.to.toISO() },
        true
      ),
    { onSuccess: () => queryClient.invalidateQueries('checklist') }
  );

  const loading = issueSummaryLoading;
  const triageReasons = issueSummaryData?.data?.triageReasons;

  return {
    loading,
    triageReasons
  };
}
