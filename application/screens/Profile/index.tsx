import { Button, View, Text } from 'react-native';

//Typing for NestedTabs
import type {
  RootStackParamList,
  BottomTabsParamList
} from '../../../NavigationTypes';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { StackScreenProps } from '@react-navigation/stack';
type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabsParamList, 'Profile'>,
  StackScreenProps<RootStackParamList>
>;

import useUser from '../../../hooks/useUser';

import JournalStats from './JournalStats';
import MedicalTeam from './MedicalTeam';
import Appointments from './Appointments';
import Dropdowns from './Dropdowns';
//
export default function Profile({ route, navigation }: Props) {
  const user = useUser();
  console.log('user');
  console.log(user);

  return (
    <View className="flex-1 flex flex-col space-y-8 items-start p-4 bg-white text-start w-full">
      <Text className="font-title text-4xl">{user?.name}</Text>

      {/* Wrapped in views to get the spacing */}
      <View className="w-full">
        <JournalStats />
      </View>
      <View>
        <MedicalTeam />
      </View>
      <View>
        <Appointments />
      </View>
      <View>
        <Dropdowns />
      </View>
    </View>
  );
}
