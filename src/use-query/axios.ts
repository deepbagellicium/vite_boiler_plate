import axios, { AxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: { "Content-Type": "application/json" },
});

// Generic GET request with optional query params
export const onFetchData = async <T>(
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig
): Promise<T> => {
  const { data } = await apiClient.get<T>(url, { ...config, params });
  return data;
};

// Generic POST request
export const onPostData = async <T, R>(
  url: string,
  payload: T,
  config?: AxiosRequestConfig
): Promise<R> => {
  const { data } = await apiClient.post<R>(url, payload, config);
  return data;
};

// Generic PUT request
export const onPutData = async <T, R>(
  url: string,
  payload: T,
  config?: AxiosRequestConfig
): Promise<R> => {
  const { data } = await apiClient.put<R>(url, payload, config);
  return data;
};

// Generic DELETE request
export const onDeleteData = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const { data } = await apiClient.delete<T>(url, config);
  return data;
};
