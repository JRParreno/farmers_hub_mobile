import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ProfileContextProvider from "./context/UserContext";
import I18nContextProvider from "./context/i18nContext";

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
          <I18nContextProvider>
            <ProfileContextProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </ProfileContextProvider>
          </I18nContextProvider>
        </SafeAreaProvider>
      )}
    </GestureHandlerRootView>
  );
}
