import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { DefaultColor } from "../../constants/Colors";
import {
  ChemicalControls,
  ChemicalInsecticide,
  Insecticide,
} from "../../models/Infestation";
import Recommendation from "../../models/Recommendation";
import { handleGetNames } from "../../utils/utls";
import { PoppinText } from "../StyledText";
import { i18nContext } from "../../context/i18nContext";

interface IProps {
  chemicalControls: Array<ChemicalControls>;
  title: string;
  recommendation: Recommendation;
}

enum i18nEnum {
  English,
  Tagalog
}

export default function ChemicalControlCard(props: IProps) {
  const { chemicalControls, title, recommendation } = props;
  const navigation = useNavigation();
  const i18n = useContext(i18nContext);

  return (
    <View style={{ flex: 0 }}>
      <PoppinText
        style={{
          fontFamily: "poppins-semibold",
          fontSize: 15,
          marginBottom: 10,
        }}
      >
        {title}
      </PoppinText>
      {chemicalControls.length > 1 && (
        <View style={styles.reminderContainer}>
          <Ionicons
            name="warning-outline"
            size={30}
            color={DefaultColor.black}
            style={{ marginRight: 10 }}
          />
          {i18n.language === i18nEnum.English ?
            <PoppinText>
              Select and apply{" "}
              <PoppinText style={{ fontFamily: "poppins-semibold" }}>
                ONLY ONE
              </PoppinText>{" "}
              of the following products to your{" "}
              {recommendation.agriculture_type.name}
            </PoppinText>
            :

            <PoppinText>
              Pumili  lamang ng {" "}
              <PoppinText style={{ fontFamily: "poppins-semibold" }}>
                isa
              </PoppinText>{" "}
              sa mga sumusunod  na produkto at gamitin sa iyong pananim{" "}
              {recommendation.agriculture_type.name}
            </PoppinText>
          }
        </View>
      )}

      {chemicalControls.length > 0 &&
        chemicalControls.map((data: ChemicalControls, index: number) => (
          <ListItem
            key={data.pk}
            topDivider={index === 0}
            bottomDivider
            hasTVPreferredFocus={undefined}
            tvParallaxProperties={undefined}
            containerStyle={{
              borderWidth: 1,
              borderRadius: 10,
            }}
            style={{
              marginBottom: 10
            }}
            onPress={() => {
              navigation.navigate("Instruction", {
                instruction: data,
                recommendation: recommendation,
              });
            }}
          >
            <Avatar
              source={require("../../assets/images/insecticide/chemical.png")}
              rounded
              avatarStyle={{
                borderWidth: 1,
              }}
            />
            <ListItem.Content>
              <ListItem.Title numberOfLines={2}>
                {handleGetNames(data.insecticides)}
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron tvParallaxProperties={undefined} />
          </ListItem>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  reminderContainer: {
    flex: 0,
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "yellow",
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: DefaultColor.white,
  },
});
