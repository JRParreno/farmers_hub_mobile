import * as React from "react";
import { Alert, Linking, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

export const checkMediaPermission = async () => {
  if (Platform.OS !== "web") {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log(status);
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Sorry, we need files and media permissions to make this work!",
        [
          {
            style: "default",
            text: "Ok",
            onPress: () => openPermissionSettings("MEDIA"),
          },
        ]
      );
      return false;
    }
  }
  return true;
};

export const checkCameraPermission = async () => {
  if (Platform.OS !== "web") {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    console.log(status);

    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Sorry, we need camera, files and media  permissions to make this work!",
        [
          {
            style: "default",
            text: "Ok",
            onPress: () => openPermissionSettings("MEDIA"),
          },
        ]
      );
      return false;
    }
  }
  return true;
};

export const openPermissionSettings = (KEY: string) => {
  switch (KEY) {
    case "MEDIA":
      if (Platform.OS === "ios") {
        Linking.openURL("app-settings:");
      } else {
        Linking.openSettings();
      }
      return;
    default:
      return;
  }
};
