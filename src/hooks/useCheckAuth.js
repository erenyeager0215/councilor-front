import { useLoginUser } from "./useLoginUser"
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const useCheckUser=()=>{
    const {currentUser}=useLoginUser();
    const navigate = useNavigate();

    const onCheckUser=useCallback(()=>{
        if (currentUser == null){
            alert("ログインが必要です");
           return navigate("/signin");
        }else{
            alert("支持する対象者が更新されました")
        }
    },[])
    return {onCheckUser}
}