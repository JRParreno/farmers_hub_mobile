import moment from "moment";
import * as React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar } from "react-native-elements";
import { DefaultColor } from "../../../constants/Colors";
import Comment from "../../../models/Comment";
import { getInitialName } from "../../../utils/utls";
import { PoppinText } from "../../StyledText";

interface IProps {
  comment: Comment;
  hideSeparator: boolean;
}

export default function CommentCard(props: IProps) {
  const { description, profile, dateUpdated } = props.comment;
  const { profilePhoto, firstName, getFullName } = profile;

  const dateTimeMoment = () => {
    const momentDate = moment(dateUpdated).format("MMM DD, YYYY");
    const momentTime = moment(dateUpdated).format("hh:mm A")

    return {
      date: momentDate,
      time: momentTime
    }
  }

  return <View style={styles.container}>
    <View style={{ flex: 0, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatarWrapper}>
          {profilePhoto ?
            <Avatar
              size={40}
              rounded
              source={{ uri: profilePhoto! }}
              containerStyle={{ backgroundColor: DefaultColor.main }}
            /> :
            <Avatar
              size={40}
              rounded
              title={getInitialName(firstName)}
              containerStyle={{ backgroundColor: DefaultColor.main }}
            />
          }
        </View>
        <PoppinText>{getFullName}</PoppinText>

      </View>
      <PoppinText>{dateTimeMoment().date}</PoppinText>

    </View>
    <View style={styles.textContainer}>
      <PoppinText>{description}</PoppinText>
    </View>
    {!props.hideSeparator && <View style={styles.borderStyle} />
    }
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: "100%",
    backgroundColor: DefaultColor.white,
    padding: 10,
  },
  borderStyle: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: DefaultColor.lightGreen,
    marginVertical: 20,
    marginHorizontal: 20
  },
  avatarContainer: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center"
  },
  avatarWrapper: {
    flex: 0,
    marginRight: 10,
  },
  textContainer: {
    flex: 0,
    marginLeft: 50
  }
});
