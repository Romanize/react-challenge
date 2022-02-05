import { AxiosPromise } from "axios";
import { User, UserFormValues } from "../../types/types";
import { axiosInstance } from "../../utils/axiosService";

export const fetchUsers = (): AxiosPromise<User[]> => axiosInstance.get("/data");
export const createUser = (values: UserFormValues): AxiosPromise<User> => axiosInstance.post(`/data`, values);
export const updateUser = (id: string, values: UserFormValues): AxiosPromise<User> =>
  axiosInstance.patch(`/data/${id}`, values);
export const deleteUser = (id: string): AxiosPromise => axiosInstance.delete(`/data/${id}`);
