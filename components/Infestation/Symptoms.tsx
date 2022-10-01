import * as React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Symptom } from "../../models/Infestation";
import { PoppinText, PoppinTextBold } from "../StyledText";

interface IProps {
  symptoms: Array<Symptom>;
}

export default function Symptoms(props: IProps) {
  const { symptoms } = props;

  return (
    <View style={styles.container}>
      {symptoms.length > 0 && (
        <React.Fragment>
          <PoppinTextBold style={{ marginBottom: 0 }}>Symptoms</PoppinTextBold>
          {symptoms.map((data: Symptom) => (
            <PoppinText key={data.id} style={{ marginLeft: 30 }}>
              • {data.description}
            </PoppinText>
          ))}
        </React.Fragment>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: "flex-start",
    paddingVertical: 10,
  },
});
