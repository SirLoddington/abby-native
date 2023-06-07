// import ReactBubbleChart from 'react-bubble-chart';

import BubbleGraph from './BubbleGraph';

export default function MentalHealthBubbles({ bubbleData }) {
  const bubbles = bubbleData?.map((d, i) => {
    //d is a string "id -- value"
    const [id, value] = d.split(' -- ');
    return {
      _id: `${id}-${i}`,
      value,
      displayText: id?.length > 10 ? id?.slice(0, 10) + '...' : id
    };
  });

  const data = bubbles?.map((d) => ({
    color: '#7f00ff', //#7f00ff
    value: d.value,
    name: d.displayText
  }));

  return <BubbleGraph width={300} height={300} data={data} />;
}
