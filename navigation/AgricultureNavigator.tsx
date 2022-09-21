/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import LandingScreen from "../screens/LandingScreen";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import { AgricultureParamList } from "../types";

const Stack = createNativeStackNavigator<AgricultureParamList>();

export default function AgricultureNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AgicultureTypes"
        component={LandingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
