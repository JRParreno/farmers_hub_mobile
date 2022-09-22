import * as React from "react";
import { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import ViewWithLoading from "../components/ViewWithLoading";
import Lottie from "lottie-react-native";
import { DefaultColor } from "../constants/Colors";
import { PoppinText } from "../components/StyledText";
import { ButtonComponent } from "../components/Button/StyledButton";
import { StackActions, useNavigation } from "@react-navigation/native";
import { storeData } from "../database/StoreData";

export default function LandingScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  return (
    <ViewWithLoading loading={loading}>
      <View style={styles.container}>
        <View
          style={{
            flex: 0,
            zIndex: 1,
            position: "absolute",
            backgroundColor: DefaultColor.white,
            borderWidth: 1,
            borderRadius: 20,
            padding: 10,
            margin: 20,
            top: 0,
          }}
        >
          <PoppinText>
            Hi User!{"\n"}Welcome to our recommendation app for toxicity of
            insecticides. The information that you will see are based on our
            research that we gather with the help of farmers and agriculturist
            in the Municipality of Polangui. Rest assured that it is reliable
            and helpful, Thank you and Enjoy!
          </PoppinText>
        </View>
        <View style={{ flex: 1, justifyContent: "flex-start", marginTop: 100 }}>
          <Lottie
            source={require("../assets/lottie/45869-farmers.json")}
            autoPlay={true}
            loop={true}
            style={{
              flex: 1,
            }}
          />
        </View>
        <ButtonComponent
          title="Continue"
          onPress={async () => {
            await storeData("skipLanding", "skipLanding");
            navigation.dispatch(StackActions.replace("Root"));
          }}
        />
      </View>
    </ViewWithLoading>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DefaultColor.lightGreen,
    paddingHorizontal: 10,
  },
});
