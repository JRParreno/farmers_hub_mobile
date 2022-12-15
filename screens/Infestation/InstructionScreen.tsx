import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import * as React from "react";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafetyCard, InstructionCard } from "../../components/Instructions";
import LinkBtn from "../../components/LinkBtn";
import { PoppinText } from "../../components/StyledText";
import { TipCard } from "../../components/Tip";
import ViewWithLoading from "../../components/ViewWithLoading";
import { DefaultColor } from "../../constants/Colors";
import { Instruction, SafetyPrecaution } from "../../models/Infestation";
import { MainStackParamLst } from "../../types";

type IType = {
  params: MainStackParamLst["Instruction"];
};

export default function InstructionScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const route = useRoute<RouteProp<IType, "params">>();
  const instruction = route.params.instruction;
  const recommendation = route.params.recommendation;
  const navigation = useNavigation();

  const handleGetToxicColor = () => {
    switch (instruction.hazard_level) {
      case "LOW":
        return "#00FF00";
      case "MODERATE":
        return "#FFFF00";
      default:
        return "#FF0000";
    }
  }

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
            {instruction.instructions.length > 0 && (
              <LinkBtn url={instruction.instructions[0].link} />
            )}
          </View>
          <TipCard
            iconName={"nuclear"}
            text={`${instruction.hazard_level} Toxic`}
            style={{ backgroundColor: handleGetToxicColor() }}
            textStyle={{
              color: instruction.hazard_level === "HIGH" ? DefaultColor.white : DefaultColor.black,
              fontSize: 18,
              fontFamily: "poppins-semibold",
            }}
            iconColor={instruction.hazard_level === "HIGH" ? DefaultColor.white : DefaultColor.black}
          />
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
              Safety Precautions!
            </PoppinText>
            {instruction.safety_precautions.length > 0 &&
              instruction.safety_precautions.map(
                (data: SafetyPrecaution, index: number) => (
                  <SafetyCard
                    key={data.pk}
                    safetyPrecaution={data}
                    isShowArrow={
                      instruction.safety_precautions.length > 1 &&
                      instruction.safety_precautions.length !== index + 1
                    }
                  />
                )
              )}
            {instruction.safety_precautions.length > 0 && (
              <LinkBtn url={instruction.safety_precautions[0].link} />
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
    marginBottom: 10,
  },
  toxicContainer: {
    flex: 0,
  },
  linkContainer: {
    flex: 0,
    width: "100%",
    alignItems: "center",
    padding: 10,
  },
});
