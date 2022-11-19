import * as React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { DefaultColor } from "../../constants/Colors";
import Post from "../../models/Post";
import moment from "moment";
import Profile from "../../models/Profile";
import { PoppinText } from "../StyledText";
import { getInitialName } from "../../utils/utls";
import { Avatar } from "react-native-elements";

interface IProps {
    profile: Profile;
    dateUpdate: string;
}

export default function PostHeader(props: IProps) {
    const { firstName, profilePhoto, getFullName } = props.profile;
    const dateUpdate = props.dateUpdate;

    const dateTimeMoment = () => {
        const momentDate = moment(dateUpdate).format("MMM DD, YYYY");
        const momentTime = moment(dateUpdate).format("hh:mm A")

        return {
            date: momentDate,
            time: momentTime
        }
    }

    return <View style={styles.container}>
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
                        title={getInitialName(firstName).join("")}
                        containerStyle={{ backgroundColor: DefaultColor.main }}
                    />
                }
            </View>
            <PoppinText>{getFullName}</PoppinText>
        </View>
        <PoppinText>{dateTimeMoment().date}  {dateTimeMoment().time}</PoppinText>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    avatarContainer: {
        flex: 0,
        flexDirection: "row",
        alignItems: "center"
    },
    avatarWrapper: {
        flex: 0,
        marginRight: 10,
    }
});
