import * as React from "react";
import { useState } from "react";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import { DefaultColor } from "../../constants/Colors";
import Infestation from "../../models/Infestation";
import { PoppinText } from "../StyledText";

interface IProps {
  onPress: () => void;
}

export default function InfestationCard(props: IProps) {
  const { onPress } = props;
  const [loading, setLoading] = useState<boolean>(false);

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
          <PoppinText style={styles.titleStyle}>INSECTS</PoppinText>
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
