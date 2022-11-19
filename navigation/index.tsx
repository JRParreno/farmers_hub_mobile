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
import { useCallback, useContext, useState } from "react";
import {
  ColorSchemeName,
  Pressable,
} from "react-native";
import Loader from "../components/Loader";
import { getData, storeData } from "../database/StoreData";
import LandingScreen from "../screens/LandingScreen";

import ModalScreen from "../screens/ModalScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

import MyDrawer from "./DrawerNavigator";
import { getProfile } from "../repository/UserRepository";
import Profile from "../models/Profile";
import { ErrorMessage } from "../utils/ErrorMessage";
import { ProfileContext } from "../context/UserContext";

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

  const [loading, setLoading] = useState(true);

  const [isLogged, setIsLogged] = useState(true);
  const profileContext = useContext(ProfileContext);

  const checkToken = async () => {
    setLoading(true);
    const accessToken = await getData("accessToken");
    const refreshToken = await getData("refreshToken");
    const user = await getData("user");

    if (accessToken && refreshToken && user) {
      profileContext?.setProfile(JSON.parse(user));
      handleGetProfile();
    } else {
      await AsyncStorage.multiRemove(["accessToken", "refreshToken", "user"]);
      setIsLogged(false);
      setLoading(false);
    }
    checkSkipped();
  };

  const handleGetProfile = () => {
    getProfile()
      .then(async (data: Profile) => {
        profileContext?.setProfile(data);
        await storeData("user", JSON.stringify(data));
      })
      .catch((error: any) => {
        ErrorMessage(error);
      })
      .finally(() => {
        setIsLogged(false);
        setLoading(false);
      });
  };


  useFocusEffect(
    useCallback(() => {
      checkToken();
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
        headerBackTitleVisible: false,
        title: "",
      }}
      initialRouteName={skipped ? "Root" : "Landing"}
    >
      <Stack.Screen
        name="Root"
        component={MyDrawer}
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{ title: "", headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="NotFound" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  ) : (
    <Loader />
  );
}
