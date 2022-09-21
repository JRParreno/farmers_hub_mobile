import ApiConfig from "../constants/ApiConfig";
import axios from "axios";
import Agriculture from "../models/Agriculture";

export async function fetchAgricultures(page: string) {
    return await axios.get(`${ApiConfig().apiUrl}/agriculture/list?page=${page}`).then(response => {
        return response.data.results.map((data: Agriculture) => {
            return data;
        });
    }).catch((error: any) => {
        throw error;
    });
}