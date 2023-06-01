import { Button, View, Text } from 'react-native';

//Typing for Tabs
// import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
// import type { BottomTabsParamList } from '../../NavigationTypes';
// type Props = BottomTabScreenProps<
//   BottomTabsParamList,
//   'Analysis',
//   'BottomTabs'
// >;

//Typing for NestedTabs
import type {
  RootStackParamList,
  BottomTabsParamList
} from '../../../NavigationTypes';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { StackScreenProps } from '@react-navigation/stack';
type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabsParamList, 'Analysis', 'BottomTabs'>,
  StackScreenProps<RootStackParamList>
>;

import { AbbyLogo } from '../../common/AbbyLogo';
import AbbyButton from '../../common/AbbyButton';

import { useState } from 'react';
import BottomModal from '../../modals/modalStyles/Bottom';
import Card from '../../modals/modalStyles/Card';
import BottomScrollModal from '../../modals/modalStyles/BottomScroll';

export default function Analysis({ route, navigation }: Props) {
  const jid = route.params?.jid;

  const [cardIsOpen, setCardIsOpen] = useState(false);
  const [sliderIsOpen, setSliderIsOpen] = useState(false);
  const [bottomScrollModalIsOpen, setBottomScrollModalIsOpen] = useState(false);

  return (
    <View className="bg-white flex-1 justify-center items-center">
      <Card isOpen={cardIsOpen} setIsOpen={setCardIsOpen}>
        <View className="flex-1 flex flex-col space-y-10 mt-10">
          <Text>Card!</Text>
          <AbbyButton
            pressFunction={() => setCardIsOpen(false)}
            text="Hide modal"
            colour="white"
            className="self-end"
          />
        </View>
      </Card>
      <BottomModal isOpen={sliderIsOpen} setIsOpen={setSliderIsOpen}>
        <View className="flex-1 flex flex-col space-y-4">
          <Text className="text-xl font-title text-center">Slider!</Text>
          <AbbyButton
            pressFunction={() => setSliderIsOpen(false)}
            text="Hide modal"
            colour="white"
            className="self-end"
          />
        </View>
      </BottomModal>
      <BottomScrollModal
        isOpen={bottomScrollModalIsOpen}
        setIsOpen={setBottomScrollModalIsOpen}
        classStyle="bg-blue ">
        <View>
          <View className="  h-[200px]">
            <Text className="text-xl font-title text-center">Scroller!</Text>
            <AbbyButton
              pressFunction={() => setBottomScrollModalIsOpen(false)}
              text="Hide modal"
              colour="white"
              className="self-end"
            />
          </View>
          <View className=" h-[200px]">
            <Text className="text-xl font-title text-center">im cruisin</Text>
          </View>
          <View className=" h-[200px]">
            <Text className="text-xl font-title text-center">Skrrrrr</Text>
          </View>
        </View>
      </BottomScrollModal>
      <Text>This is the Journal analysis page for journal {jid}</Text>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
      <AbbyLogo />
      <AbbyButton
        text="Slider modal"
        colour="white"
        shapeStyle="box"
        pressFunction={() => {
          setSliderIsOpen(true);
        }}
      />
      <AbbyButton
        text="Card modal"
        colour="white"
        shapeStyle="box"
        pressFunction={() => {
          setCardIsOpen(true);
        }}
      />
      <AbbyButton
        text="Bottom scroll modal"
        colour="white"
        shapeStyle="box"
        pressFunction={() => {
          setBottomScrollModalIsOpen(true);
        }}
      />
    </View>
  );
}
