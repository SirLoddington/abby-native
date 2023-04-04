/// <reference types="nativewind/types" />

import { StatusBar } from 'expo-status-bar';
import {  Text, SafeAreaView, View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';

import * as Font from 'expo-font';

import * as SplashScreen from 'expo-splash-screen';
// import { Georama_400Regular } from '@expo-google-fonts/georama';
import { Poppins_400Regular } from '@expo-google-fonts/poppins';

/* Prevent splash screen from hiding automatically */

SplashScreen.preventAutoHideAsync();

export default function App() {

  // // Initialize state for app readiness
  const [appIsReady, setAppIsReady] = useState(false);

  // // Show splash screen while we load Google Fonts
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        // await Font.loadAsync({ Georama_400Regular });
        await Font.loadAsync({ Poppins_400Regular });
      } catch (e) {
        console.warn(e);
      } finally {
        console.log('Loaded fonts')
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  // // Create a callback for when our font is done loading
  // const onLayoutRootView = useCallback(async () => {
  //   if (appIsReady) {
  //     await SplashScreen.hideAsync();
  //     console.log('Hiding splash screen')
  //   }
  // }, [appIsReady]);

  // return null until app is ready
  if (!appIsReady) {
    console.log('Loading...')
    return <Text>Loading...</Text>;
  }

  console.log('App is ready NOW!')
  return (
    // <SafeAreaView onLayout={()=>{}}>
    <View className="flex-1 items-center justify-center bg-blue">
      <Text className='font-title text-white text-4xl'>AbbyHealth</Text>
      <Text className=' text-white text-2xl'>Cumming soon</Text>
      <StatusBar style="auto" />
    </View>
    // </SafeAreaView>
  );
}

