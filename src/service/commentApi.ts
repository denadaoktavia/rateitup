import API from "@/lib/axios";
import type { IComment } from "@/utils/Interface";

export const getCommentsByReview = async (
  reviewId: number
): Promise<IComment[]> => {
  const res = await API.get(`/reviews/${reviewId}/comments`);
  return res.data;
};

export const createComment = async (reviewId: number, data: IComment) => {
  const res = await API.post(`/reviews/${reviewId}/comments`, data);
  return res.data;
};

export const deleteComment = async (id: number) => {
  await API.delete(`/comments/${id}`);
};
