import axios from "axios";
import { useCallback } from "react";
import { useLoginUser } from "./useLoginUser";

export const useFavorite = () => {
  const { setCurrentUser } = useLoginUser();

  const postFavoriteCouncilor = useCallback(async (councilor_id, userInfo) => {
    const res = await axios
      .post(`http://localhost:1323/favorite/councilor`, {
        user_id: userInfo.user_id,
        councilor_id: councilor_id,
      })
      .catch((e) => {
        console.log(e);
      });
    setCurrentUser(res.data);
  }, []);

  const postFavoriteCategory = useCallback(async (category_id, userInfo) => {
    const res = await axios
      .post(`http://localhost:1323/favorite/category`, {
        user_id: userInfo.user_id,
        category_id: category_id,
      })
      .catch((e) => {
        console.log(e);
      });
    setCurrentUser(res.data);
  }, []);

  return { postFavoriteCouncilor, postFavoriteCategory };
};
