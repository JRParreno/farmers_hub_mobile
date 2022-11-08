import * as React from "react";
import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { DefaultColor } from "../constants/Colors";
import Agriculture from "../models/Agriculture";
import { MonoText, PoppinText } from "./StyledText";
import { Image } from "react-native-elements";

interface IProps {
  data: Agriculture;
  onPress: () => void;
}

export default function AgriItemCard(props: IProps) {
  const { pk, agriculture_image, description, name } = props.data;
  const { onPress } = props;
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <PoppinText
          style={{
            fontFamily: "poppins-semibold",
          }}
        >
          {name}
        </PoppinText>
        <View style={{ flex: 1 }}>
          <Image
            resizeMode="contain"
            source={{ uri: agriculture_image }}
            PlaceholderContent={<ActivityIndicator />}
            height={"100%"}
            width={"100%"}
            containerStyle={{
              flex: 1,
              borderWidth: 1,
              borderColor: DefaultColor.white,
              borderRadius: 5,
            }}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    height: Dimensions.get("screen").width * 0.45 + 30,
    width: Dimensions.get("screen").width * 0.4,
    padding: 10,
    borderWidth: 2,
    borderColor: DefaultColor.main,
    borderRadius: 20,
    marginRight: 10,
  },
});
