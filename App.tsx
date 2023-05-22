/// <reference types="nativewind/types" />

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Text, SafeAreaView, View } from 'react-native';
import React, { useCallback } from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';

import * as SplashScreen from 'expo-splash-screen';
// import { Georama_400Regular } from '@expo-google-fonts/georama';
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic
} from '@expo-google-fonts/poppins';
// import { Avinir_400Regular } from '@expo-google-fonts/avinir';

import RootStack from './application/RootStack';

/* Prevent splash screen from hiding automatically */

SplashScreen.preventAutoHideAsync();

export default function App() {
  // // Initialize state for app readiness
  // const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity
      }
    }
  });

  return (
    // <SafeAreaView onLayout={()=>{}}>

    <QueryClientProvider client={queryClient}>
      {/* Unauthenticated Router*/}
      <View className={' flex-1 '} onLayout={onLayoutRootView}>
        <RootStack />
      </View>
    </QueryClientProvider>
  );
}
