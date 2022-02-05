import { AxiosPromise } from "axios";
import { User } from "../../types/types";
import { axiosInstance } from "../../utils/axiosService";

export const fetchUsers = (): AxiosPromise<User[]> => axiosInstance.get("/data");
