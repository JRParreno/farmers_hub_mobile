import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { DefaultColor } from "../../constants/Colors";
import { PoppinText } from "../StyledText";

interface IProps {
  text: string;
  iconName: any;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconColor?: string;
}

export default function TipCard(props: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { style, text, iconName, textStyle, iconColor } = props;
  return (
    <View style={[styles.container, style]}>
      <Ionicons
        name={iconName}
        size={25}
        color={iconColor ? iconColor : DefaultColor.black}
        style={{ marginRight: 10 }}
      />
      <PoppinText style={[textStyle]}>{text}</PoppinText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: DefaultColor.grey,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: DefaultColor.white,
  },
});
