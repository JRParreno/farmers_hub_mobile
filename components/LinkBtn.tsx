import * as React from "react";
import { useState } from "react";
import { Pressable, StyleSheet, Linking, Alert } from "react-native";
import { PoppinText } from "./StyledText";

interface IProps {
  url: string;
}

export default function LinkBtn(props: IProps) {
  const { url } = props;

  const handleOpenUrl = async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };
  return (
    <Pressable style={styles.container} onPress={handleOpenUrl}>
      <PoppinText numberOfLines={1} style={{ color: "blue" }}>
        {url}
      </PoppinText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    marginVertical: 10,
  },
});
