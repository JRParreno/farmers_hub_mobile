import * as React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { DefaultColor } from "../../constants/Colors";
import {
  ChemicalControls,
  ChemicalInsecticide,
  Insecticide,
} from "../../models/Infestation";
import { PoppinText } from "../StyledText";

interface IProps {
  chemicalControls: Array<ChemicalControls>;
  title: string;
}

export default function ChemicalControlCard(props: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { chemicalControls, title } = props;

  const handleGetNames = (insecticides: Array<ChemicalInsecticide>) => {
    let names = "";
    if (insecticides.length > 0) {
      insecticides.map((data: ChemicalInsecticide) => {
        names += `${data.insecticide.name} ${data.percentage}% `;
      });
    }
    return names;
  };

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
});
