import { Entypo, Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar } from "react-native-elements";
import { DefaultColor } from "../../constants/Colors";
import NO_IMAGE from "../../constants/NoImage";
import { Instruction } from "../../models/Infestation";
import { PoppinText } from "../StyledText";

interface IProps {
  instruction: Instruction;
  isShowArrow: boolean;
}

export default function InstructionCard(props: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { instruction, isShowArrow } = props;

  return (
    <View style={styles.container}>
      <View style={styles.childContainer}>
        <Avatar
          source={{
            uri:
              instruction.icon_image !== null
                ? instruction.icon_image
                : NO_IMAGE,
          }}
          rounded
          size={"medium"}
          avatarStyle={{
            borderWidth: 1,
            borderColor: DefaultColor.grey,
          }}
          containerStyle={{ marginRight: 20 }}
        />
        <View style={{ flex: 1 }}>
          <PoppinText style={{ textAlign: "justify" }}>
            {instruction.description}
          </PoppinText>
        </View>
      </View>
      {isShowArrow && (
        <Entypo
          name="arrow-long-down"
          size={25}
          color="black"
          style={{ marginLeft: 11, marginVertical: 5 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
  childContainer: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 1,
  },
});
