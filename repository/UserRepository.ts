import ApiConfig from "../constants/ApiConfig";
import axios from "axios";
import apiInstance from "../utils/AxiosSettings";
import Profile from "../models/Profile";

export async function login(username: string, password: string) {

    const data = {
        "grant_type": 'password',
        "client_id": ApiConfig().clientId,
        "client_secret": ApiConfig().clientSecret,
        "username": username,
        "password": password,
    }

    return axios.post(`${ApiConfig().url}o/login/`, data).then(response => {
        return {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            customer: response.data.customer,
        };
    }).catch((error: any) => {
        throw error;
    });
}

export async function register(
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    confirm_password: string,
    address: string,
    mobile_number: string,
    latitude: string,
    longitude: string,
    gender: string,
    birthdate: string
) {

    const data = {
        email: email,
        first_name: first_name,
        last_name: last_name,
        password: password,
        confirm_password: confirm_password,
        address: address,
        mobile_number: mobile_number,
        latitude: latitude,
        longitude: longitude,
        gender: gender,
        birthdate: birthdate
    };

    return await axios.post(`${ApiConfig().apiUrl}/register`, data).then(response => {
        return {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
        };
    }).catch((error: any) => {
        throw error;
    });
}

export async function getProfile() {
    return await apiInstance.get(`${ApiConfig().apiUrl}/profile`)
        .then((response: any) => {
            const data = response.data;
            return new Profile(
                data.user.pk,
                data.user.first_name,
                data.user.last_name,
                data.user.mobile_number,
                data.user.email,
                data.user.address,
                data.user.gender,
                data.user.birthdate,
                data.user.profile_picture ? (ApiConfig().media + data.user.profile_picture) : "",
            );
        })
        .catch((error: any) => {
            console.log(error.response);
            throw error;
        });
}

export async function updateProfilePassword(
    oldPassowrd: string,
    newPassword: string
) {

    const data = {
        "old_password": oldPassowrd,
        "new_password": newPassword
    }


    return apiInstance.patch(`${ApiConfig().apiUrl}/change-password`, data)
        .then(response => {
        }).catch((e) => {
            throw e;
        });

}

export async function ForgotPassword(email: string) {

    const data = {
        "email_address": email,
    }

    return await axios.post(`${ApiConfig().apiUrl}/forgot-password`, data)
        .then((response: any) => {
            return {
                message: response.data.success
            }
        })
        .catch((error: any) => {
            throw error;
        });
}

export async function UpdateAddress(
    pk: string,
    longitude: string,
    latitude: string,
    address_name: string,
) {
    const data = {
        "longitude": longitude,
        "latitude": latitude,
        "address_name": address_name
    }

    return await apiInstance.patch(`${ApiConfig().apiUrl}/address/${pk}`, data)
        .then((response: any) => {
            return "Successfully update your address"
        })
        .catch((error: any) => {
            throw error;
        });
}

export async function UpdateInformation(
    email: string,
    firstName: string,
    lastName: string,
    mobile_number: string,
    gender: string,
    birthday: string
) {
    const data = {
        "user": {
            "email": email,
            "first_name": firstName,
            "last_name": lastName,
        },
        "mobile_number": mobile_number,
        "gender": gender,
        "birthdate": birthday
    }

    return await apiInstance.patch(`${ApiConfig().apiUrl}/profile`, data)
        .then((response: any) => {
            const data = response.data;
            return new Profile(
                data.user.pk,
                data.user.first_name,
                data.user.last_name,
                data.user.mobile_number,
                data.user.email,
                data.user.address,
                data.user.gender,
                data.user.birthdate,
                data.user.profile_picture ? (ApiConfig().media + data.user.profile_picture) : "",
            );
        })
        .catch((error: any) => {
            throw error;
        });
}

export async function UploadPicture(image: string) {
    const data = {
        "profile_picture": image
    }

    return await apiInstance.patch(`${ApiConfig().apiUrl}/profile/upload`, data)
        .then(() => {
            return "Successfully update profile";
        })
        .catch((error: any) => {
            throw error;
        });
}