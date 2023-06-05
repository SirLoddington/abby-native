# abby-native

AbbyHealth native app

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
