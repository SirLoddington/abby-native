import { useQuery } from 'react-query';
import { getAllInsights, getInsightsForUser } from '../../../../../services';
import _ from 'lodash';

export default function useQOLData({ dateRange }) {
  const { data: allInsights, isLoading: allInsightsLoading } = useQuery(
    ['allInsights'],
    async () => {
      return await getAllInsights();
    }
  );

  const { data: userInsightsData, isLoading: userInsightsLoading } = useQuery(
    ['userInsights', dateRange],
    () =>
      getInsightsForUser({
        from: dateRange.from.toISO(),
        to: dateRange.to.toISO()
      })
  );

  const loading = allInsightsLoading || userInsightsLoading;

  const otherClassifications = userInsightsData?.data?.insights.filter(
    (ins) => ins.type !== 'symptom'
  );

  const otherInsights = allInsights?.filter((ins) =>
    otherClassifications?.find((classif) => classif.classification === ins.code)
  );
  const allNonSymptomInsights = allInsights?.filter((insight) => {
    return insight.type !== 'symptom';
  });

  // in each otherInsight, add a field for the number of times it appears in the otherClassifications array
  otherInsights?.forEach((ins) => {
    const count = otherClassifications?.filter(
      (classif) => classif.classification === ins.code
    ).length;
    ins.count = count;
  });

  //Merge each of the nonSymptomInsights with the corresponding allNonSymptomInsight
  const nonSymptomInsightsExtraData = otherInsights
    ?.map((nsi) => {
      const allNonSymptomInsight = allNonSymptomInsights?.find((ansi) => {
        return ansi.code === nsi.issueCode;
      });
      return { ...nsi, ...allNonSymptomInsight };
    })
    //sort by the number of times impacted
    .sort((a, b) => {
      return b.count - a.count;
    });

  return {
    loading,
    otherInsights: nonSymptomInsightsExtraData
  };
}
