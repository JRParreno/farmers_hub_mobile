import ApiConfig from "../constants/ApiConfig";
import axios from "axios";
import Post from "../models/Post";
import Comment from "../models/Comment";
import apiInstance from "../utils/AxiosSettings";
import Profile from "../models/Profile";

export async function fetchPostList(page: string) {
    return await apiInstance.get(`${ApiConfig().apiUrl}/post/list?page=${page}`).then(response => {
        return response.data.results.map((data: any) => {
            return new Post(
                data.pk,
                new Profile(
                    data.profile.user.pk,
                    data.profile.user.username,
                    data.profile.user.email,
                    data.profile.user.first_name,
                    data.profile.user.last_name,
                    data.profile.user.first_name + " " + data.profile.user.last_name,
                    data.profile.user.username,
                    data.profile.profile_photo ? data.profile.profile_photo : "",
                ),
                data.description,
                data.date_created,
                data.date_updated,
                data.comment_total,
                data.image,
            );
        });
    }).catch((error: any) => {
        throw error;
    });
}

export async function fetchCommentList(pk: string, page: string) {
    const url = `${ApiConfig().apiUrl}/comment/list?post=${pk}&page=${page}`;
    return await apiInstance.get(url).then(response => {
        return response.data.results.map((data: any) => {
            return new Comment(
                data.pk,
                data.post,
                new Profile(
                    data.profile.user.pk,
                    data.profile.user.username,
                    data.profile.user.email,
                    data.profile.user.first_name,
                    data.profile.user.last_name,
                    data.profile.user.first_name + " " + data.profile.user.last_name,
                    data.profile.user.username,
                    data.profile.profile_photo ? data.profile.profile_photo : "",
                ),
                data.description,
                data.date_created,
                data.date_updated,
            );
        });
    }).catch((error: any) => {
        throw error;
    });
}
