import API from "@/lib/axios";
import type { ApiResponse, IRestaurant } from "@/utils/Interface";

export const getRestaurants = async (): Promise<ApiResponse<IRestaurant[]>> => {
  const res = await API.get("/restaurants");
  return res.data;
};

export const getRestaurant = async (
  id: number
): Promise<ApiResponse<IRestaurant>> => {
  const res = await API.get(`/restaurants/${id}`);
  return res.data;
};

export const createRestaurant = async (data: IRestaurant) => {
  const res = await API.post("/restaurants", data);
  return res.data;
};

export const updateRestaurant = async (id: number, data: IRestaurant) => {
  const res = await API.put(`/restaurants/${id}`, data);
  return res.data;
};

export const deleteRestaurant = async (id: number) => {
  await API.delete(`/restaurants/${id}`);
};
