import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ProfileContextProvider from "./context/UserContext";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {!isLoadingComplete ? (
        <View></View>
      ) : (
        <SafeAreaProvider>
          <ProfileContextProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </ProfileContextProvider>
        </SafeAreaProvider>
      )}
    </GestureHandlerRootView>
  );
}
