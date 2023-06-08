import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { useQuery } from 'react-query';

import { getUserDoctors } from '../../../services';

import { PlusIcon } from 'react-native-heroicons/solid';

export default function MedicalTeam() {
  const { data } = useQuery('user-doctors', getUserDoctors);
  const userDoctors = data?.data;
  return (
    <View className="flex justify-center items-start">
      <Text style={{ fontSize: 24, fontFamily: 'font-title' }}>
        My Medical Team
      </Text>
      <ScrollView
        // className="h-10"
        horizontal
        className="flex flex-row">
        {userDoctors?.map(({ name }) => (
          <View
            key={`doctor-${name}-summary`}
            className="rounded-full h-20 w-20 flex justify-center items-center"
            style={{
              borderWidth: 1,
              borderColor: 'white',
              padding: 8,
              backgroundColor: '#e7e7e7'
            }}>
            <Text className="font-title text-2xl">
              {name?.toUpperCase()[0]}
              {name.split(' ')[1]?.toUpperCase()[0]}
            </Text>
          </View>
        ))}
        <TouchableOpacity
          //   onPress={scrollToMedicalTeam}
          className="justify-center items-center bg-blue rounded-full h-20 w-20">
          <PlusIcon style={{ color: 'white', width: 24, height: 24 }} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
