// Types to be used for the stack and tab pages/navigators

// Homepage: undefined; //No params
// Profile: { userId: string }; //Required params
// Feed: { sort: 'latest' | 'top' } | undefined; //Optional params

import { NavigatorScreenParams } from '@react-navigation/native';

export type BottomTabsParamList = {
  Journal: undefined;
  Analysis: { jid: string } | undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  MissionControl: NavigatorScreenParams<BottomTabsParamList>;
  Profile: undefined;
  Personal: undefined;
  MedicalTeam: undefined;
  MedicalHistory: undefined;
  Lifestyle: undefined;
  Journalling: undefined;
  JournalPage: undefined;
};
