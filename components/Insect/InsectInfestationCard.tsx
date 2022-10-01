import * as React from "react";
import { useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { DefaultColor } from "../../constants/Colors";
import NO_IMAGE from "../../constants/NoImage";
import { Insect } from "../../models/Infestation";
import { PoppinText, PoppinTextBold } from "../StyledText";

interface IProps {
  insect: Insect;
}

export default function InsectInfestationCard(props: IProps) {
  const { insect_image, link, name, pk } = props.insect;
  console.log(insect_image);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <PoppinText style={styles.titleStyle}>{name}</PoppinText>
      </View>
      <ImageBackground
        source={insect_image ? { uri: insect_image } : { uri: NO_IMAGE }}
        style={styles.imageContainer}
        imageStyle={{ height: "100%", width: "100%" }}
        resizeMode={"cover"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    minHeight: 300,
    maxHeight: 400,
  },
  titleContainer: {
    flex: 1,
    backgroundColor: "#F4B184",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    borderWidth: 1,
    borderColor: DefaultColor.dark,
    borderRadius: 20,
    marginBottom: 20,
  },
  titleStyle: {
    fontFamily: "poppins-semibold",
    fontSize: 25,
  },
  imageContainer: {
    flex: 2,
    height: "100%",
    width: "100%",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: DefaultColor.dark,
    borderRadius: 20,
  },
});
