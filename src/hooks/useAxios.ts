import axios from 'axios';
import useSWR from 'swr';

const axiosInstance = axios.create({ baseURL: 'https://api.themoviedb.org/3' });

const useAxios = (url: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    url,
    async (url) => {
      const response = await axiosInstance.get(`${url}&api_key=cfe422613b250f702980a3bbf9e90716`);
      return response.data;
    },
    { refreshInterval: 1000 }
  );
  return { response: data, error, isLoading, mutate };
};

export default useAxios;
