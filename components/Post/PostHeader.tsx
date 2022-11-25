import * as React from "react";
import { useContext, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { DefaultColor } from "../../constants/Colors";
import Post from "../../models/Post";
import moment from "moment";
import Profile from "../../models/Profile";
import { PoppinText } from "../StyledText";
import { getInitialName } from "../../utils/utls";
import { Avatar, BottomSheet, ListItem } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { ProfileContext } from "../../context/UserContext";
import { ButtonComponent } from "../Button/StyledButton";
import { StackActions, useNavigation } from "@react-navigation/native";
import { deletePost } from "../../repository/PostRepository";

interface IProps {
    profile: Profile;
    dateUpdate: string;
    post: Post;
}

export default function PostHeader(props: IProps) {
    const navigation = useNavigation();

    const { firstName, profilePhoto, getFullName, pk } = props.profile;
    const dateUpdate = props.dateUpdate;
    const profileContext = useContext(ProfileContext);
    const [isVisible, setIsVisible] = useState(false);
    const list = [
        {
            title: 'Edit', onPress: () => {
                setIsVisible(false);
                // @ts-ignore
                navigation.navigate("PostEdit", { post: props.post });
            },
            titleStyle: { fontSize: 18, fontFamily: "poppins-regular" },
        },
        {
            title: 'Delete',
            onPress: () => {
                setIsVisible(false);
                handleAlertDeletePost();
            },
            containerStyle: { backgroundColor: 'red' },

            titleStyle: { color: 'white', fontSize: 18, fontFamily: "poppins-regular" },
        },
    ];
    const dateTimeMoment = () => {
        const momentDate = moment(dateUpdate).format("MMM DD, YYYY");
        const momentTime = moment(dateUpdate).format("hh:mm A")

        return {
            date: momentDate,
            time: momentTime
        }
    }

    const handleDeletePost = () => {
        deletePost(props.post.pk).then((data: string) => {
            Alert.alert("Farm hub", data,
                [
                    {
                        text: "OK",
                        onPress: () => {
                            navigation.dispatch(StackActions.replace("PostList"));
                        }
                    }
                ]
            );
        });
    }

    const handleAlertDeletePost = () => {
        Alert.alert("Farm hub", "Are you sure you want to delete this post?",
            [
                {
                    text: "OK",
                    onPress: () => {
                        handleDeletePost()
                    }
                },
                {
                    text: "Cancel",
                }
            ]
        );
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
            <View style={styles.detailContainer}>
                <PoppinText>{getFullName}</PoppinText>
                <PoppinText>{dateTimeMoment().date}  {dateTimeMoment().time}</PoppinText>
            </View>
        </View>
        {profileContext?.profile?.pk === pk &&
            <TouchableOpacity
                onPress={() => {
                    setIsVisible(true);
                }}
                style={{ padding: 5 }}
            >
                <Ionicons name="ellipsis-horizontal" size={26} />
            </TouchableOpacity>
        }
        {/* @ts-ignore */}
        <BottomSheet modalProps={{
            animationType: "fade",
            statusBarTranslucent: false,
        }} isVisible={isVisible} >
            <View style={styles.bottomSheetHeader}>
                <PoppinText style={{ fontSize: 18 }}>Post Options</PoppinText>
                <TouchableOpacity
                    onPress={() => {
                        setIsVisible(false);
                    }}
                    style={{ padding: 5 }}
                >
                    <Ionicons name="close-outline" size={26} />
                </TouchableOpacity>
            </View>
            {list.map((l, i) => (
                <ListItem
                    key={i}
                    containerStyle={l.containerStyle}
                    onPress={l.onPress} tvParallaxProperties={undefined} hasTVPreferredFocus={undefined}                >
                    <ListItem.Content>
                        <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            ))}
        </BottomSheet>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    bottomSheetHeader: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: DefaultColor.white,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: DefaultColor.grey
    },
    detailContainer: {
        flex: 0,
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
