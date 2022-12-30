import * as React from "react";
import { useContext, useState } from "react";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import { DefaultColor } from "../../constants/Colors";
import Infestation from "../../models/Infestation";
import { PoppinText } from "../StyledText";
import { i18nContext } from "../../context/i18nContext";

interface IProps {
  onPress: () => void;
}

enum i18nEnum {
  English,
  Tagalog
}

export default function InfestationCard(props: IProps) {
  const { onPress } = props;
  const i18n = useContext(i18nContext);

  return (
    <Pressable
      onPress={() => {
        onPress();
      }}
    >
      <View style={styles.container}>
        <View
          style={[
            styles.textContainer,
            {
              backgroundColor: "#F4B184",
            },
          ]}
        >
          <PoppinText style={styles.titleStyle}>
            {i18n.language === i18nEnum.Tagalog ? "Mga yugto" : "STAGES"}
          </PoppinText>
        </View>
        <ImageBackground
          source={require("../../assets/images/season/insect.gif")}
          style={{ height: "100%", width: "100%", flex: 1 }}
          resizeMode={"contain"}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    height: 150,
    flexDirection: "row",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#F4B184",
  },
  textContainer: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  titleStyle: {
    fontFamily: "poppins-semibold",
    fontSize: 25,
    textAlign: "center",
  },
});
