import React from 'react';
import { View } from 'react-native';
import {
  VictoryChart,
  VictoryLine,
  VictoryArea,
  VictoryAxis
} from 'victory-native';

export default function BurdenAreaGraph({
  detailed = false,
  rawData,
  labels,
  title,
  color = 'blue',
  symptom = null
}) {
  const colorSchemeMap = {
    blue: 'rgb(0, 16, 214)',
    white: 'rgb(255, 255, 255)'
  };

  console.log('rawData');
  console.log(rawData);

  const aggregateData = {
    labels,
    datasets: [
      {
        fill: 'origin',
        //data array of objects of type {x: index, y: the sum of all symptoms from rawData at index, y0:0}
        data: rawData[0]?.data?.map((val, index) => ({
          x: index,
          y: rawData.reduce((acc, curr) => {
            return acc + curr.data[index];
          }, 0),
          y0: 0
        })),

        style: {
          data: {
            fill: symptom ? 'rgb(0, 16, 214, 0.3)' : colorSchemeMap[color],
            strokeLinejoin: 'round',
            strokeWidth: 2
          }
        }
      },
      {
        fill: 'origin',
        data:
          symptom &&
          rawData
            .find((data) => data.burden === symptom)
            ?.data?.map((val, index) => ({
              x: index,
              y: val,
              y0: 0
            })),

        style: {
          data: {
            fill: colorSchemeMap[color],
            strokeLinejoin: 'round',
            strokeWidth: 2
          }
        }
      }
    ]
  };

  const options = {
    style: {
      axisLabel: { fontSize: 15, fill: colorSchemeMap[color] },
      tickLabels: { fontSize: 15, fill: colorSchemeMap[color] }
    },
    maxDomain: Math.max(
      ...aggregateData.datasets[0]?.data?.map((point) => point.y),
      ...(aggregateData.datasets[1]?.data || [])?.map((point) => point.y)
    ),
    minDomain: 0
  };

  return (
    <View>
      <VictoryChart
        height={300}
        padding={{ top: 20, bottom: 50, left: 50, right: 10 }}>
        {detailed && symptom ? (
          <VictoryArea
            data={aggregateData.datasets[0].data}
            style={aggregateData.datasets[0].style}
            interpolation="natural"
            cornerRadius={{ top: 10, bottom: 10 }}
          />
        ) : (
          <VictoryArea
            data={aggregateData.datasets[0].data}
            style={aggregateData.datasets[0].style}
            interpolation="natural"
            cornerRadius={{ top: 10, bottom: 10 }}
            //
          />
        )}

        {symptom && (
          <VictoryLine
            data={aggregateData.datasets[1].data || []}
            style={aggregateData.datasets[1].style}
            interpolation="natural"
          />
        )}

        <VictoryAxis
          dependentAxis
          label={detailed && 'Number of symptoms'}
          style={
            detailed
              ? {
                  axisLabel: { padding: 30 },
                  tickLabels: { padding: 5 }
                }
              : {
                  axis: { stroke: 'transparent' },
                  ticks: { stroke: 'transparent' },
                  tickLabels: { fill: 'transparent' }
                }
          }
          tickFormat={(tick) => tick.toFixed(0)}
        />
      </VictoryChart>
    </View>
  );
}
