import { Entypo } from "@expo/vector-icons";
import * as React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar } from "react-native-elements";
import { DefaultColor } from "../../constants/Colors";
import { SafetyPrecaution } from "../../models/Infestation";
import { PoppinText } from "../StyledText";

interface IProps {
  safetyPrecaution: SafetyPrecaution;
  isShowArrow: boolean;
}

export default function SafetyCard(props: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { safetyPrecaution, isShowArrow } = props;

  return (
    <View style={styles.container}>
      <View style={styles.childContainer}>
        <Avatar
          source={{ uri: safetyPrecaution.icon_image }}
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
            {safetyPrecaution.description}
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
