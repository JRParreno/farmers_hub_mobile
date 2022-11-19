import {
  StackActions,
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/core";
import * as React from "react";
import { useCallback, useContext, useState } from "react";
import { Alert, Platform, StyleSheet } from "react-native";
import LoginForm from "./LoginForm";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProfileContext } from "../../context/UserContext";
import { getData, storeData } from "../../database/StoreData";
import { getProfile } from "../../repository/UserRepository";
import ViewWithLoading from "../../components/ViewWithLoading";
import Header from "./Header";
import { ErrorMessage } from "../../utils/ErrorMessage";
import Profile from "../../models/Profile";


export default function LoginScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);



  return (
    <ViewWithLoading loading={loading}>
      <View style={styles.container}>
        <Header headerText={"Farmer Hub"} />
        <LoginForm setLoading={setLoading} />
      </View>
    </ViewWithLoading>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

