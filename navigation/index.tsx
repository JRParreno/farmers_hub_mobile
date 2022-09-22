/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Ionicons } from "@expo/vector-icons";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useFocusEffect,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { useCallback, useState } from "react";
import {
  ColorSchemeName,
  Pressable,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import Loader from "../components/Loader";
import { DefaultColor } from "../constants/Colors";
import { getData } from "../database/StoreData";
import HomeScreen from "../screens/HomeScreen";
import LandingScreen from "../screens/LandingScreen";

import ModalScreen from "../screens/ModalScreen";
import { RootStackParamList } from "../types";
import AgricultureNavigator from "./AgricultureNavigator";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [skipped, setSkipped] = useState(true);
  const [isInitialized, setInitialized] = useState(false);

  const checkSkipped = async () => {
    const skipLanding = await getData("skipLanding");
    setSkipped(skipLanding !== undefined && skipLanding !== "");
    setInitialized(true);
  };

  useFocusEffect(
    useCallback(() => {
      checkSkipped();
    }, [])
  );

  return isInitialized ? (
    <Stack.Navigator
      screenOptions={{
        headerBackVisible: true,
        headerRight: () => (
          <Pressable
            onPress={async () => {
              await AsyncStorage.multiRemove(["skipLanding"]);
            }}
          >
            <Ionicons name="menu" size={26} />
          </Pressable>
        ),
      }}
      initialRouteName={skipped ? "Root" : "Landing"}
    >
      <Stack.Screen
        name="Root"
        component={HomeScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen
        name="Agriculture"
        component={AgricultureNavigator}
        options={{ title: "" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="NotFound" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  ) : (
    <Loader />
  );
}
