import request from "./axios";

export const getReviewList = async (page) => {
  return request.get(`/admin/reviews?size=10&page=${page}`, {
    headers: {
      Authorization: sessionStorage.getItem("ACCESS_TOKEN"),
    },
  });
};
