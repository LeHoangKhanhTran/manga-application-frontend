import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import config from "../config";

export default function useFetch<T>(path: string, params?: any, withCredentials: boolean = false) {
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState<boolean>();
    const [error, setError] = useState<string>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(_prev => true);
                const response = await axios.get(`${config.apiUrl}${path[0] === '/' ? path : '/' + path}`, {withCredentials: withCredentials, params: {params}});
                setData(response.data)
            }
            catch (error) {
                setError(_prev => (error as AxiosError).message)
            }
            finally {
                setLoading(_prev => false);
            }
        }
        fetchData();
    }, [path, params, withCredentials]);
    return {data, loading, error};
}

export function useMultipleFetch<T, T1>(list: T1[], path: string, params?: any) {
    const [data, setData] = useState<T[]>();
    const [loading, setLoading] = useState<boolean>();
    const [error, setError] = useState<string>();
    useEffect(() => {
        setLoading(_prev => true)
        const fetchData = async () => {
            try {
                const requests = list.map((item) => axios.get<T>(`${config.apiUrl}${path}/${item}`));
                if (requests) {
                    const responses = await axios.all(requests);
                    setData(_prev => responses.map(response => response.data as T));
                }
            }
            catch (error) {
                setError(_prev => (error as AxiosError).message);
            }
            finally {
                setLoading(_prev => false);
            }
        }
        fetchData();
    }, [list, path, params]);
    return {data, loading, error};
}