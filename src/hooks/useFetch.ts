import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import config from "../config";

export default function useFetch<T>( path: string, params?: any, withCredentials: boolean = false) {
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState<boolean>();
    const [error, setError] = useState<string>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(_prev => true);
                const response = await axios.get(`${config.apiUrl}${path[0] === '/' ? path : '/' + path}`, {withCredentials: withCredentials, params: {params}});
                setLoading(_prev => false);
                setData(response.data)
            }
            catch (error) {
                setError(_prev => (error as AxiosError).message)
            }
        }
        fetchData();
    }, [path]);
    return {data, loading, error};
}