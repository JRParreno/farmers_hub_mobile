import { RouteProp, useRoute } from "@react-navigation/native";
import * as React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  ChemicalControlCard,
  RecommendationText,
} from "../../components/Recommendation";
import { PoppinText, PoppinTextBold } from "../../components/StyledText";
import ViewWithLoading from "../../components/ViewWithLoading";
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
          />
        </ScrollView>
      </View>
    </ViewWithLoading>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
