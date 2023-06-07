import React from 'react';
import {
  VictoryChart,
  VictoryPolarAxis,
  VictoryArea,
  VictoryLegend,
  VictoryBar
} from 'victory-native';

export default function QualityOfLifeGraphic({
  nonSymptomInsights,
  highlightedImpact = '',
  setHighlightedImpact,
  clickable = false
}) {
  const labels = nonSymptomInsights?.map((insight) => insight.name);

  const bgColors = clickable
    ? nonSymptomInsights?.map((insight) => {
        if (highlightedImpact !== insight.name && highlightedImpact !== '') {
          return insight.color?.rgbFaded;
        }
        return insight.color?.rgb;
      })
    : [
        'rgb(135,58,7)',
        'rgb(230,136,19)',
        'rgb(131,78,10)',
        'rgb(222,143,62)',
        'rgb(153,89,25)',
        'rgb(91,61,15)',
        'rgb(222,158,63]'
      ];

  const data = nonSymptomInsights?.map((insight) => ({
    x: insight.name,
    y: insight.count
  }));

  const handleChartClick = (point) => {
    if (!clickable || !point) return;
    if (highlightedImpact === nonSymptomInsights[point.index].name) {
      setHighlightedImpact('');
    } else {
      setHighlightedImpact(nonSymptomInsights[point.index].name);
    }
  };

  return (
    <VictoryChart
      polar
      //   domainPadding={{ x: 25 }}
      events={
        [
          // { target: 'data', eventHandlers: { onClick: () => handleChartClick } }
        ]
      }>
      <VictoryPolarAxis
        style={{
          //   axis: { stroke: 'transparent' },
          //   ticks: { stroke: 'transparent' },
          tickLabels: { fill: 'transparent' },
          //axis colour
          axis: { stroke: '#C86000' }
        }}
      />
      <VictoryBar
        data={data}
        style={{
          data: {
            fill: ({ index }) => bgColors[index]
          }
        }}
      />
    </VictoryChart>
  );
}
