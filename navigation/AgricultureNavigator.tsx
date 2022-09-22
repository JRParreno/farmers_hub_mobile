import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { AgriTypeScreen } from "../screens/Agirculture";
import { AgricultureParamList } from "../types";

const Stack = createNativeStackNavigator<AgricultureParamList>();

export default function AgricultureNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        title: "",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="AgicultureTypes"
        component={AgriTypeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
