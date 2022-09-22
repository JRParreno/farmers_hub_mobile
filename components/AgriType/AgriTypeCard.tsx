import * as React from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { DefaultColor } from "../../constants/Colors";
import AgriType from "../../models/AgriType";
import { PoppinText } from "../StyledText";
import { Image } from "react-native-elements";

interface IProps {
  data: AgriType;
  onPress: () => void;
}

export default function AgriTypeCard(props: IProps) {
  const { pk, agriculture_type_image, description, name } = props.data;
  const { onPress } = props;
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View
        style={{
          height: Dimensions.get("screen").width * 0.2 + 25,
          width: Dimensions.get("screen").width * 0.2 + 25,
        }}
      >
        <Image
          resizeMode="contain"
          source={{ uri: agriculture_type_image }}
          PlaceholderContent={<ActivityIndicator />}
          height={"100%"}
          width={"100%"}
          containerStyle={{
            flex: 1,
            borderWidth: 1,
            borderColor: DefaultColor.white,
            borderRadius: 500,
          }}
        />
      </View>
      <PoppinText
        style={{
          fontFamily: "poppins-semibold",
        }}
        numberOfLines={1}
      >
        {name}
      </PoppinText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: DefaultColor.lightGreen,
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("screen").width * 0.4,
    width: Dimensions.get("screen").width * 0.4,
    padding: 20,
    borderWidth: 2,
    borderColor: DefaultColor.main,
    borderRadius: 500,
    overflow: "hidden",
  },
});
