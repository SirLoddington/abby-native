/// <reference types="nativewind/types" />

import { StatusBar } from 'expo-status-bar';
import {  Text, View } from 'react-native';

import * as Font from 'expo-font';


export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-blue">
      <Text className='font-userText text-white font-bold text-xl'>CUM</Text>
      <StatusBar style="auto" />
    </View>
  );
}

