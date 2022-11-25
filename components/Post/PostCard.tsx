import * as React from "react";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native";
import { DefaultColor } from "../../constants/Colors";
import Post from "../../models/Post";
import moment from "moment";
import PostHeader from "./PostHeader";
import { PoppinText } from "../StyledText";
import { Image } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface IProps {
    post: Post;
    hideBottom?: boolean;
}

export default function PostCard(props: IProps) {
    const { commentTotal, dateUpdated, description, image, pk, profile } = props.post;
    const { email, firstName, getFullName, lastName, mobileNumber, username, profilePhoto } = profile;
    const navigation = useNavigation();

    return <View style={styles.container}>
        <PostHeader
            dateUpdate={dateUpdated}
            profile={profile}
            post={props.post}
        />
        <TouchableOpacity
            onPress={() => {
                // @ts-ignore
                navigation.navigate("Post", { post: props.post });
            }}
        >
            <View style={[styles.descripContainer, image ? { height: 200 } : {}]}>
                <PoppinText>
                    {description}
                </PoppinText>
                {
                    image && <Image
                        resizeMode="cover"
                        source={{ uri: image }}
                        PlaceholderContent={<ActivityIndicator />}
                        height={200}
                        width={"100%"}
                        containerStyle={{
                            flex: 1,
                            marginTop: 10,
                            borderWidth: 1,
                            borderColor: DefaultColor.white,
                            borderRadius: 10,
                            elevation: 4,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                        }}
                    />
                }
            </View>
        </TouchableOpacity>
        {props.hideBottom === undefined &&
            <View style={styles.bottomContainer}>
                <Ionicons

                    name="chatbox-ellipses-outline"
                    size={24}
                />
                <PoppinText>
                    {commentTotal} comment {commentTotal > 1 ? "s" : ""}
                </PoppinText>
            </View>
        }
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: DefaultColor.white,
        padding: 10,
        borderWidth: 1,
        borderColor: DefaultColor.white,
        borderRadius: 5,
        marginBottom: 10
    },
    descripContainer: {
        flex: 0,
        marginHorizontal: 20,
        marginTop: 10,
        overflow: "hidden"
    },
    bottomContainer: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        paddingHorizontal: 30,
        marginTop: 5
    }
});
