import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";
import * as React from "react";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { AddComment, CommentCard, PostCard } from "../../components/Post";
import ViewWithLoading from "../../components/ViewWithLoading";
import { DefaultColor } from "../../constants/Colors";
import Comment from "../../models/Comment";
import { fetchCommentList } from "../../repository/PostRepository";
import { CommunityStackParamLst } from "../../types";
import { ErrorMessage } from "../../utils/ErrorMessage";

type IType = {
    params: CommunityStackParamLst["Post"];
};

export default function PostDetailScreen() {
    const route = useRoute<RouteProp<IType, "params">>();
    const post = route.params.post;
    const [loading, setLoading] = useState<boolean>(false);
    const [comments, setComments] =
        useState<Array<Comment> | null>(null);
    const [numPage, setNumPage] = useState("1");
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const handleGetComments = (page: number) => {
        fetchCommentList(post.pk, page.toString())
            .then((data: Array<Comment>) => {
                if (data && data.length > 0) {
                    if (page === 1) {
                        setComments(data);
                    } else {
                        if (comments) {
                            setComments(comments.concat(data));
                        }
                    }
                    setNumPage(page.toString());
                } else {
                    setComments(data);
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
        return <CommentCard
            comment={item}
            hideSeparator={index + 1 === comments?.length}
        />;
    };

    useFocusEffect(
        useCallback(() => {
            handleGetComments(1);
        }, [])
    );

    return <ViewWithLoading loading={loading}>
        <View style={styles.container}>
            <FlatList
                ListHeaderComponent={<PostCard
                    hideBottom={true}
                    post={post}
                />}
                data={comments}
                keyboardDismissMode={"on-drag"}
                scrollsToTop={true}
                showsVerticalScrollIndicator={false}
                renderItem={_renderItem}
                keyExtractor={(item) => item.pk}
                onEndReached={() => {
                    let page = Number(numPage) + 1;
                    handleGetComments(page);
                }}
                refreshing={refreshing}
                onRefresh={() => {
                    setRefreshing(true);
                    handleGetComments(1);
                }}
                contentContainerStyle={{
                    padding: 10
                }}
            />
            <AddComment
                postId={post.pk}
                onSubmit={() => {
                    setRefreshing(true);
                    handleGetComments(1);
                }}
            />
        </View>
    </ViewWithLoading>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DefaultColor.bgList,
    },
});
