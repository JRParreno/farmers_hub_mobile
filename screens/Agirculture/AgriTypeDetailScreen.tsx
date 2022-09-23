import { RouteProp, useRoute } from "@react-navigation/native";
import * as React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import ViewWithLoading from "../../components/ViewWithLoading";
import { RootStackParamList } from "../../types";

type IType = {
  params: RootStackParamList["AgicultureTypeDetail"];
};

export default function AgriTypeDetailScreen() {
  const route = useRoute<RouteProp<IType, "params">>();
  const agricultureType = route.params.agricultureType;

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <ViewWithLoading loading={loading}>
      <View></View>
    </ViewWithLoading>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
