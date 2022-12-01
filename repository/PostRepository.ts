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
                    data.profile.pk,
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

export async function addCommentPost(postId: string, description: string) {
    const postData = {
        "post": postId,
        "description": description
    }

    const url = `${ApiConfig().apiUrl}/comment/create`;
    return await apiInstance.post(url, postData).then(response => {
        const data = response.data;
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
    }).catch((error: any) => {
        throw error;
    });
}

export async function createPost(photo: string, description: string) {
    const postData = {
        "image": photo,
        "description": description
    }
    const url = `${ApiConfig().apiUrl}/post/create`;
    return await apiInstance.post(url, postData).then(response => {
        const data = response.data;
        return data;
    }).catch((error: any) => {
        throw error;
    });
}

export async function updatePost(pk: string, photo: string, description: string) {
    let data = {};

    if (photo.length > 1) {
        data = {
            "description": description,
            "image": photo,
            "pk": pk
        }
    } else {
        data = {
            "description": description,
            "pk": pk
        }
    }

    const url = `${ApiConfig().apiUrl}/post/update/${pk}`;
    return await apiInstance.patch(url, data).then(response => {
        const data = response.data;
        return data;
    }).catch((error: any) => {
        throw error;
    });
}

export async function deletePost(pk: string) {

    const url = `${ApiConfig().apiUrl}/post/delete/${pk}`;
    return await apiInstance.delete(url).then(response => {
        const data = response.data;
        return "Post deleted successfully";
    }).catch((error: any) => {
        throw error;
    });
}
