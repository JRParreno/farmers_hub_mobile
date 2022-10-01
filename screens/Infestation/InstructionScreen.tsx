import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import * as React from "react";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import InstructionCard from "../../components/Instructions/InstructionCard";
import { PoppinText } from "../../components/StyledText";
import { TipCard } from "../../components/Tip";
import ViewWithLoading from "../../components/ViewWithLoading";
import { DefaultColor } from "../../constants/Colors";
import { Instruction } from "../../models/Infestation";
import { RootStackParamList } from "../../types";

type IType = {
  params: RootStackParamList["Instruction"];
};

export default function InstructionScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const route = useRoute<RouteProp<IType, "params">>();
  const instruction = route.params.instruction;
  const recommendation = route.params.recommendation;
  const navigation = useNavigation();

  return (
    <ViewWithLoading loading={loading}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TipCard
            iconName={"information-circle-sharp"}
            text={instruction.reminder}
          />
          <View style={styles.applicationContainer}>
            <PoppinText
              style={{
                fontSize: 14,
                fontFamily: "poppins-semibold",
                marginBottom: 20,
              }}
            >
              Application Instructions
            </PoppinText>
            {instruction.instructions.length > 0 &&
              instruction.instructions.map(
                (data: Instruction, index: number) => (
                  <InstructionCard
                    key={data.pk}
                    instruction={data}
                    isShowArrow={
                      instruction.instructions.length > 1 &&
                      instruction.instructions.length !== index + 1
                    }
                  />
                )
              )}
          </View>
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
  applicationContainer: {
    flex: 0,
    padding: 10,
    borderWidth: 1,
    borderColor: DefaultColor.grey,
    borderRadius: 10,
  },
});
