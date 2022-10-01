import * as React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { DefaultColor } from "../../constants/Colors";
import { PoppinText, PoppinTextBold } from "../StyledText";

interface IProps {
  text: string;
  title: string;
}

export default function RecommendationText(props: IProps) {
  const { text, title } = props;

  return (
    <View style={styles.container}>
      <PoppinText
        style={{
          fontFamily: "poppins-semibold",
          fontSize: 15,
          marginBottom: 10,
        }}
      >
        {title}
      </PoppinText>
      <View
        style={[
          styles.container,
          {
            borderWidth: 1,
            borderColor: DefaultColor.main,
            padding: 10,
          },
        ]}
      >
        <PoppinText>{text}</PoppinText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    marginBottom: 10,
  },
});
