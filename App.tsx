/// <reference types="nativewind/types" />

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Text, SafeAreaView, View } from 'react-native';
import React, { useCallback } from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';

import * as SplashScreen from 'expo-splash-screen';
// import { Georama_400Regular } from '@expo-google-fonts/georama';

import loadFonts from './assets/fonts/loadFonts';

import RootStack from './application/RootStack';

/* Prevent splash screen from hiding automatically */

SplashScreen.preventAutoHideAsync();

export default function App() {
  // // Initialize state for app readiness
  // const [appIsReady, setAppIsReady] = useState(false);

  const fontsLoaded = loadFonts();

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
