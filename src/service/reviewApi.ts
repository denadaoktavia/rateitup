import API from "@/lib/axios";
import type { IReview } from "@/utils/Interface";

export const getReviewsByRestaurant = async (
  restaurantId: number
): Promise<IReview[]> => {
  const res = await API.get(`/restaurants/${restaurantId}/reviews`);
  return res.data;
};

export const createReview = async (restaurantId: number, data: IReview) => {
  const res = await API.post(`/restaurants/${restaurantId}/reviews`, data);
  return res.data;
};

export const updateReview = async (id: number, data: IReview) => {
  const res = await API.put(`/reviews/${id}`, data);
  return res.data;
};

export const deleteReview = async (id: number) => {
  await API.delete(`/reviews/${id}`);
};
