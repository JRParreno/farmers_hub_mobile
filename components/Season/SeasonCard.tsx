import * as React from "react";
import { useState } from "react";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import { RecommendationSeason } from "../../models/Season";
import { PoppinText } from "../StyledText";

interface IProps {
  season: RecommendationSeason;
  index: number;
  onPress: (season: RecommendationSeason) => void;
}

export default function SeasonCard(props: IProps) {
  const { index, onPress } = props;
  const { description, pk, image, season } = props.season;
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Pressable
      onPress={() => {
        onPress(props.season);
      }}
    >
      <View
        style={[
          styles.container,
          { borderColor: season.name === "DRY" ? "#E5C45B" : "#B1D4E5" },
        ]}
      >
        {index % 2 === 0 ? (
          <React.Fragment>
            <View
              style={[
                styles.textContainer,
                {
                  backgroundColor:
                    season.name === "DRY" ? "#E5C45B" : "#B1D4E5",
                },
              ]}
            >
              <PoppinText style={styles.titleStyle}>
                {season.name}
                {"\n"}SEASON
              </PoppinText>
            </View>
            {season.name === "DRY" ? (
              <ImageBackground
                source={
                  image
                    ? { uri: image }
                    : require("../../assets/images/season/dry.gif")
                }
                style={{ height: "100%", width: "100%", flex: 1 }}
                resizeMode={"contain"}
              />
            ) : (
              <ImageBackground
                source={
                  image
                    ? { uri: image }
                    : require("../../assets/images/season/wet.gif")
                }
                style={{
                  height: "100%",
                  width: "100%",
                  flex: 1,
                }}
                resizeMode={"contain"}
              />
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {season.name === "DRY" ? (
              <ImageBackground
                source={
                  image
                    ? { uri: image }
                    : require("../../assets/images/season/dry.gif")
                }
                style={{ height: "100%", width: "100%", flex: 1 }}
                resizeMode={"contain"}
              />
            ) : (
              <ImageBackground
                source={
                  image
                    ? { uri: image }
                    : require("../../assets/images/season/wet.gif")
                }
                style={{
                  height: "100%",
                  width: "100%",
                  flex: 1,
                }}
                resizeMode={"contain"}
              />
            )}

            <View
              style={[
                styles.textContainer,
                {
                  backgroundColor:
                    season.name === "DRY" ? "#E5C45B" : "#B1D4E5",
                },
              ]}
            >
              <PoppinText style={styles.titleStyle}>
                {season.name}
                {"\n"}SEASON
              </PoppinText>
            </View>
          </React.Fragment>
        )}
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
