import * as React from "react";
import { StyleSheet, Image, StyleProp, ViewStyle, View } from "react-native";
import LottieView from "lottie-react-native";
import { PoppinText } from "../../components/StyledText";

interface IProps {
  headerText: string;
  style?: StyleProp<ViewStyle>;
}

export default function Header(props: IProps) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={{ flex: 1 }}>
        <LottieView
          style={{ flex: 1 }}
          source={require("../../assets/lottie/45869-farmers.json")}
          autoPlay
          loop
        />
      </View>
      <PoppinText style={styles.headerText}>{props.headerText}</PoppinText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logoStyle: {
    height: "90%",
    width: "90%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  headerText: {
    fontFamily: "poppins-semibold",
    textAlign: "center",
    fontSize: 18,
    marginTop: 10,
  },
});
