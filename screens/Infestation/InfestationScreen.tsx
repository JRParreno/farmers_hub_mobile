import { RouteProp, useRoute } from "@react-navigation/native";
import * as React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Symptoms } from "../../components/Infestation";
import { InsectInfestationCard } from "../../components/Insect";
import { PoppinTextBold } from "../../components/StyledText";
import ViewWithLoading from "../../components/ViewWithLoading";
import { RootStackParamList } from "../../types";

type IType = {
  params: RootStackParamList["Infestation"];
};

export default function InfestationScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const route = useRoute<RouteProp<IType, "params">>();
  const infestation = route.params.infestation;
  const recommendation = route.params.recommendation;

  return (
    <ViewWithLoading loading={loading}>
      <View style={styles.container}>
        <PoppinTextBold>{recommendation.title}</PoppinTextBold>
        <InsectInfestationCard insect={infestation.insect} />
        <Symptoms symptoms={infestation.symptoms} />
      </View>
    </ViewWithLoading>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
