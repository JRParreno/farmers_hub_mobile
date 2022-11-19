import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import * as React from "react";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { PostCard } from "../../components/Post";
import { PoppinText } from "../../components/StyledText";
import ViewWithLoading from "../../components/ViewWithLoading";
import { DefaultColor } from "../../constants/Colors";
import Post from "../../models/Post";
import { fetchPostList } from "../../repository/PostRepository";
import { ErrorMessage } from "../../utils/ErrorMessage";

export default function CommunityScreen() {
    const [loading, setLoading] = useState<boolean>(true);
    const [query, setQuery] = useState<string>("");
    const [posts, setPosts] =
        useState<Array<Post> | null>(null);
    const [numPage, setNumPage] = useState("1");
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const handleGetPosts = (page: number) => {
        fetchPostList(page.toString())
            .then((data: Array<Post>) => {
                if (data && data.length > 0) {
                    if (page === 1) {
                        setPosts(data);
                    } else {
                        if (posts) {
                            setPosts(posts.concat(data));
                        }
                    }
                    setNumPage(page.toString());
                } else {
                    setPosts(data);
                }
            })
            .catch((error: any) => {
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
                setLoading(false);
                setRefreshing(false);
            });
    };

    const _renderItem = ({ item, index }) => {
        return (
            <PostCard
                post={item}
            />
        );
    };

    useFocusEffect(
        useCallback(() => {
            handleGetPosts(1);
        }, [])
    );


    return <ViewWithLoading loading={loading}>
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={{ flex: 0, borderWidth: 2, padding: 10, borderColor: DefaultColor.main, borderRadius: 3 }}>
                    <PoppinText
                        style={{
                            fontFamily: "poppins-semibold",
                            fontSize: 18
                        }}
                    >Hello! What's on your mind?</PoppinText>
                </View>
                <Ionicons
                    name="camera-outline"
                    size={42}
                />
            </View>
            {posts && posts.length > 0 && (
                <FlatList
                    data={posts}
                    scrollsToTop={true}
                    showsVerticalScrollIndicator={false}
                    renderItem={_renderItem}
                    keyExtractor={(item) => item.pk}
                    onEndReached={() => {
                        let page = Number(numPage) + 1;
                        handleGetPosts(page);
                    }}
                    refreshing={refreshing}
                    onRefresh={() => {
                        setRefreshing(true);
                        handleGetPosts(1);
                    }}
                />
            )}
        </View>
    </ViewWithLoading>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultColor.bgList,
        padding: 10
    },
    headerContainer: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        backgroundColor: DefaultColor.white,
        padding: 10,
    }
});
