# abby-native

AbbyHealth native app

## env

i run this with the simulator app from the app store
npm install
npm run start

## Auth

I've just been getting a token from running Abby on local and getting the accessToken from session storage (Devtools->Application)
and putting it in useSSE and services

## Headers

import headers from the folder
include in the screen's entry into the RootStack

options={{

//either
headerShown: false

    //OR

    headerTitle: (props) => <HeaderForCentre/>, // <></> will free up the space for the side headers
    headerLeft: (props) => <HeaderForLeftSide/>,
    headerRight: () => <></>

}}

## Making a new screen

Put it under the appropriate Journal/Analysis/Profile folder.
Add it to RootStack

## Modals

There are 3 modal styles to pick from in the modalStyle folder.
They currently all follow a different format - they are all concepts for how they could all be done.
They should be standardised b4 we rip in

Store modals together with the component that summons them.

## Debugging

brew install react-native-debugger
open it
cmd+t -> set port to 19000
run expo project (npm run start)
open app in emulator
m in terminal to toggle menu
Start remote debugging

## Build onto phone

Docs to follow
https://docs.expo.dev/develop/development-builds/installation/?redirected
https://docs.expo.dev/develop/development-builds/create-a-build/

make sure the app.json has this under expo
"updates": {
"url": "https://u.expo.dev/7aa91f65-982d-4a93-9524-574e72bdf702"
},
"runtimeVersion": "1.0.0"

eas build:configure

plug in phone with lightning cable
npx expo run:ios --device
select phone

npx expo run:ios

check out https://docs.expo.dev/guides/sharing-preview-releases/
for ad hoc distribution
select UDID option in previous steps
