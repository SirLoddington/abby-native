/// <reference types="nativewind/types" />

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Text, SafeAreaView, View } from 'react-native';
import React, { useCallback } from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';

import * as SplashScreen from 'expo-splash-screen';
// import { Georama_400Regular } from '@expo-google-fonts/georama';

import loadFonts from './assets/fonts/loadFonts';

import RootStack from './application/RootStack';

// Ignore this error from the carousel package. Its within their library so beyond our reach
//It doesnt actually affect anything, so happy to ignore it
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'ViewPropTypes will be removed from React Native, along with all other PropTypes.',
  "ViewPropTypes will be removed from React Native, along with all other PropTypes. We recommend that you migrate away from PropTypes and switch to a type system like TypeScript. If you need to continue using ViewPropTypes, migrate to the 'deprecated-react-native-prop-types' package."
]); // Ignore log notification by message

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
      <SafeAreaView className={' flex-1 '} onLayout={onLayoutRootView}>
        <RootStack />
      </SafeAreaView>
    </QueryClientProvider>
  );
}
