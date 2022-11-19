import { Alert, Linking, Platform } from "react-native";
import * as IntentLauncherAndroid from "expo-intent-launcher";
import * as Location from "expo-location";

export const checkLocationPermission = async (action: () => void) => {
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    Alert.alert("ACKServices", "Please allow location permission", [
      {
        text: "OK",
        onPress: showSettingLocation,
      },
    ]);
  } else {
    // run action when granted location permission
    await checkLocationService(action);
  }
};

const showSettingLocation = async () => {
  if (Platform.OS == "ios") {
    await Linking.openURL("app-settings:");
  } else {
    await IntentLauncherAndroid.startActivityAsync(
      IntentLauncherAndroid.ActivityAction.LOCATION_SOURCE_SETTINGS
    );
  }
};

const checkLocationService = async (action: () => void) => {
  const service = Location.hasServicesEnabledAsync();
  service
    .then(async (enable: any) => {
      if (enable) {
        // run action
        action();
      } else {
        // request user to turn on location to use app
        Alert.alert("ACKServices", "Please turn on your location services", [
          {
            text: "OK",
            onPress: showSettingLocation,
          },
        ]);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
