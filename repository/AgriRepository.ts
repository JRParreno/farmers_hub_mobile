import ApiConfig from "../constants/ApiConfig";
import axios from "axios";
import Agriculture from "../models/Agriculture";
import AgriType from "../models/AgriType";

export async function fetchAgricultures(page: string) {
    return await axios.get(`${ApiConfig().apiUrl}/agriculture/list?page=${page}`).then(response => {
        return response.data.results.map((data: Agriculture) => {
            return data;
        });
    }).catch((error: any) => {
        throw error;
    });
}

export async function fetchAgricultureTypes(pk: string, page: string) {
    return await axios.get(`${ApiConfig().apiUrl}/agriculture-type/list?agriculture_pk=${pk}&page=${page}`).then(response => {
        return response.data.results.map((data: AgriType) => {
            return data;
        });
    }).catch((error: any) => {
        throw error;
    });
}