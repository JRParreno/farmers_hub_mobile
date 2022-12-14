import ApiConfig from "../constants/ApiConfig";
import axios from "axios";
import Agriculture from "../models/Agriculture";
import AgriType from "../models/AgriType";
import Recommendation from "../models/Recommendation";
interface IProps {
    pk: string;
    page: number;
    query: string;
}

export async function fetchAgricultures(page: string) {
    return await axios.get(`${ApiConfig().apiUrl}/agriculture/list?page=${page}`).then(response => {
        return response.data.results.map((data: Agriculture) => {
            return data;
        });
    }).catch((error: any) => {
        throw error;
    });
}

export async function fetchAgricultureTypes(props: IProps) {
    const { page, pk, query } = props;
    const url = `${ApiConfig().apiUrl}/agriculture-type/list?title=${query}&agriculture_pk=${pk}&page=${page}`;
    console.log(url);
    return await axios.get(url).then(response => {
        return response.data.results.map((data: AgriType) => {
            return data;
        });
    }).catch((error: any) => {
        throw error;
    });
}

export async function fetchRecommendation(props: IProps) {
    const { page, pk, query } = props;
    return await axios.get(`${ApiConfig().apiUrl}/recommendation/list?title=${query}&type=${pk}&page=${page}`).then(response => {
        return response.data.results.map((data: Recommendation) => {
            return data;
        });
    }).catch((error: any) => {
        throw error;
    });
}

export async function rateRecommendation(pk: string, rate: number) {
    const data = {
        "my_rate": rate
    }
    return await axios.patch(`${ApiConfig().apiUrl}/recommendation/rate/${pk}`, data).then(response => {
        return "Your response has been submitted successfully";
    }).catch((error: any) => {
        throw error;
    });
}