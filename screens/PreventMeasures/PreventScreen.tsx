import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import * as React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LinkBtn from "../../components/LinkBtn";
import { PoppinText } from "../../components/StyledText";
import ViewWithLoading from "../../components/ViewWithLoading";
import { DefaultColor } from "../../constants/Colors";
import { PreventMeasure } from "../../models/Infestation";
import { RootStackParamList } from "../../types";

type IType = {
  params: RootStackParamList["PreventMeasures"];
};

export default function PreventScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const route = useRoute<RouteProp<IType, "params">>();
  const infestation = route.params.infestation;
  const recommendation = route.params.recommendation;

  return (
    <ViewWithLoading loading={loading}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {infestation.prevent_measures.length > 0 ? (
            <React.Fragment>
              {infestation.prevent_measures.map((data: PreventMeasure) => (
                <View style={styles.preventCard} key={data.id}>
                  <PoppinText style={{ fontFamily: "poppins-semibold" }}>
                    {data.description}
                  </PoppinText>
                </View>
              ))}
              <LinkBtn url={infestation.prevent_measures[0].link} />
            </React.Fragment>
          ) : (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <PoppinText>No data</PoppinText>
            </View>
          )}
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
  preventCard: {
    flex: 0,
    width: "100%",
    borderWidth: 1,
    borderColor: DefaultColor.main,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
});
