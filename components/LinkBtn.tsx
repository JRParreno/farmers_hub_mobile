import * as React from "react";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { PoppinText } from "./StyledText";

interface IProps {
  url: string;
}

export default function LinkBtn(props: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { url } = props;
  return (
    <Pressable style={styles.container}>
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
