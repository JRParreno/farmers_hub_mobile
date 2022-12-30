import * as React from "react";
import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Symptom } from "../../models/Infestation";
import { PoppinText, PoppinTextBold } from "../StyledText";
import { i18nContext } from "../../context/i18nContext";

interface IProps {
  symptoms: Array<Symptom>;
}

enum i18nEnum {
  English,
  Tagalog
}

export default function Symptoms(props: IProps) {
  const { symptoms } = props;
  const i18n = useContext(i18nContext);

  return (
    <View style={styles.container}>
      {symptoms.length > 0 && (
        <React.Fragment>
          <PoppinTextBold style={{ marginBottom: 0 }}>
            {i18n.language === i18nEnum.Tagalog ?
              "Mga sintomas"
              :
              "Symptoms"
            }
          </PoppinTextBold>
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
