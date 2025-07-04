import API from "@/lib/axios";
import type { ApiResponse, IUser } from "@/utils/Interface";

export const getUser = async (id: number): Promise<ApiResponse<IUser>> => {
  const res = await API.get(`/users/${id}`);
  return res.data;
};

export const updateUser = async (id: number, data: IUser) => {
  const res = await API.put(`/users/${id}`, data);
  return res.data;
};
