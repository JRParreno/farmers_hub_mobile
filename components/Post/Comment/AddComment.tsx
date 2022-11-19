import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { DefaultColor } from "../../../constants/Colors";
import Comment from "../../../models/Comment";
import { addCommentPost } from "../../../repository/PostRepository";
import { ErrorMessage } from "../../../utils/ErrorMessage";
import TextField from "../../TextInput/TextField";

interface IProps {
    postId: string;
    onSubmit: () => void;
}

export default function AddComment(props: IProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [text, setText] = useState<string>("");

    const handleAddNewComment = () => {
        addCommentPost(props.postId, text).catch((error: any) => {
            if (
                error.response &&
                error.response.data &&
                error.response.data.detail
            ) {
                return true;
            }
            ErrorMessage(error);
        })
            .finally(() => {
                setText("");
                props.onSubmit();
            });
    }

    return <View style={styles.container}>
        <View style={[styles.inputContainer, { width: text.length > 1 ? "85%" : "100%" }]}>
            <TextField
                text={text}
                setText={setText}
                label={""}
                placeholder={"Add Comment"}
            />
        </View>
        <View style={{ flex: 1, display: text.length > 0 ? "flex" : "none" }}>
            <TouchableOpacity
                style={{ flex: 1, justifyContent: "center", alignItems: "center", }}
                onPress={() => {
                    handleAddNewComment();
                }}
            >

                <Ionicons
                    name="send"
                    size={30}
                    color={DefaultColor.secondary}
                />
            </TouchableOpacity>
        </View>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: DefaultColor.white,
        paddingHorizontal: 10
    },
    inputContainer: {
        flex: 0,
    }
});
