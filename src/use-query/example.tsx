import { useMutation, useQuery } from "@tanstack/react-query";
import { onDeleteData, onFetchData, onPostData, onPutData } from "./axios";

export const useOnFetchUsers = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["users", page, limit],
    queryFn: () => onFetchData("/users", { _page: page, _limit: limit }),
    staleTime: 1000 * 60 * 5,
  });
};

export const useOnCreateUser = () => {
  return useMutation({
    mutationFn: (newUser: { name: string; email: string }) =>
      onPostData("/users", newUser),
  });
};

export const useOnUpdateUser = () => {
  return useMutation({
    mutationFn: ({
      id,
      userData,
    }: {
      id: number;
      userData: { name: string; email: string };
    }) => onPutData(`/users/${id}`, userData),
  });
};

export const useOnDeleteUser = () => {
  return useMutation({
    mutationFn: (id: number) => onDeleteData(`/users/${id}`),
  });
};
