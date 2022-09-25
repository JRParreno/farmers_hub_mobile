import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import * as React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ButtonComponent } from "../../components/Button/StyledButton";
import { Symptoms } from "../../components/Infestation";
import { InsectInfestationCard } from "../../components/Insect";
import { PoppinTextBold } from "../../components/StyledText";
import ViewWithLoading from "../../components/ViewWithLoading";
import { DefaultColor } from "../../constants/Colors";
import { RootStackParamList } from "../../types";

type IType = {
  params: RootStackParamList["Infestation"];
};

export default function InfestationScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const route = useRoute<RouteProp<IType, "params">>();
  const infestation = route.params.infestation;
  const recommendation = route.params.recommendation;

  return (
    <ViewWithLoading loading={loading}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <PoppinTextBold>{recommendation.title}</PoppinTextBold>
          <InsectInfestationCard insect={infestation.insect} />
          <Symptoms symptoms={infestation.symptoms} />
          <ButtonComponent
            title="Prevent"
            onPress={() => {}}
            backgroundColor={DefaultColor.secondary}
          />
          <ButtonComponent
            title="Treat Now"
            onPress={() => {
              navigation.navigate("Treat", {
                infestation: infestation,
                recommendation: recommendation,
              });
            }}
            backgroundColor={DefaultColor.danger}
          />
        </ScrollView>
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
