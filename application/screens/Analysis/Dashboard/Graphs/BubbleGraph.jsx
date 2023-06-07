import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import * as d3 from 'd3';
import _ from 'lodash';
import Svg, { Circle, G, Text as SVGText } from 'react-native-svg';

export default function BubbleGraph({ data, width, height }) {
  const [bubbleData, setBubbleData] = useState(data);

  useEffect(() => {
    if (!_.isEqual(data, bubbleData)) {
      setBubbleData(data);
    }
  }, [data]);

  const pack = (data) =>
    d3
      .pack()
      .size([width - 2, height - 2])
      .padding(3)(d3.hierarchy({ children: data }).sum((d) => d.value));

  const root = pack(bubbleData);

  const fontSizeGenerator = (value) => {
    let size = 0;
    if (value < 10) {
      size = 15;
    } else if (value >= 10 && value < 50) {
      size = 20;
    } else {
      size = 25;
    }
    return size;
  };

  const leaves = root.leaves().map((leaf) => (
    <G
      transform={`translate(${leaf.x + 1},${leaf.y + 1})`}
      key={leaf.data.name}>
      <Circle r={leaf.r} fill={leaf.data.color} />
      <SVGText
        fill="#FFFFFF"
        fontSize={fontSizeGenerator(leaf.data.value)}
        x="0"
        y={leaf.data.value * 0.1}
        textAnchor="middle">
        {leaf.data.name}
      </SVGText>
    </G>
  ));

  return (
    <View style={{ flex: 1 }}>
      <Svg width={400} height={400}>
        {leaves}
      </Svg>
    </View>
  );
}
