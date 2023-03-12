import { useLoginUser } from "./useLoginUser";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const useCheckUser = () => {
  const { currentUser } = useLoginUser();
  const navigate = useNavigate();

  const onCheckUser = useCallback(() => {
    if (Object.keys(currentUser).length === 0) {
      alert("ログインが必要です");
      return navigate("/signin");
    } else {
      alert("データが更新されました");
    }
  }, []);
  return { onCheckUser };
};
