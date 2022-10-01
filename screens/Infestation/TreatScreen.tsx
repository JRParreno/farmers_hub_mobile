import { RouteProp, useRoute } from "@react-navigation/native";
import * as React from "react";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  ChemicalControlCard,
  RecommendationText,
} from "../../components/Recommendation";
import { PoppinText, PoppinTextBold } from "../../components/StyledText";
import ViewWithLoading from "../../components/ViewWithLoading";
import { DefaultColor } from "../../constants/Colors";
import { RootStackParamList } from "../../types";

type IType = {
  params: RootStackParamList["Treat"];
};

export default function TreatScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const route = useRoute<RouteProp<IType, "params">>();
  const infestation = route.params.infestation;
  const recommendation = route.params.recommendation;

  return (
    <ViewWithLoading loading={loading}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <PoppinTextBold>{recommendation.title}</PoppinTextBold>
          {infestation.recommendation_description.length > 0 && (
            <RecommendationText
              text={infestation.recommendation_description}
              title="Recommendations"
            />
          )}
          {infestation.organic_control.length > 0 && (
            <RecommendationText
              text={infestation.organic_control}
              title="Organic Control"
            />
          )}
          <ChemicalControlCard
            chemicalControls={infestation.chemical_controls}
            title="Chemical Controls"
            recommendation={recommendation}
          />
        </ScrollView>
        <View style={styles.rateContainer}>
          <PoppinText style={{ fontFamily: "poppins-semibold" }}>
            How useful did you find this information?
          </PoppinText>
          <View style={styles.rateChildContainer}>
            <Pressable
              style={styles.rateBtn}
              android_ripple={{ color: DefaultColor.main }}
            >
              <PoppinText style={styles.iconSize}>😄</PoppinText>
            </Pressable>
            <Pressable
              style={styles.rateBtn}
              android_ripple={{ color: DefaultColor.main }}
            >
              <PoppinText style={styles.iconSize}>😐</PoppinText>
            </Pressable>
            <Pressable
              style={styles.rateBtn}
              android_ripple={{ color: DefaultColor.main }}
            >
              <PoppinText style={styles.iconSize}>🙁</PoppinText>
            </Pressable>
          </View>
        </View>
      </View>
    </ViewWithLoading>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  rateContainer: {
    flex: 0,
    padding: 10,
    alignItems: "center",
    width: "100%",
  },
  rateChildContainer: {
    flex: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
  },
  rateBtn: {
    flex: 0,
  },
  iconSize: {
    fontSize: 35,
  },
});
