import { useCallback } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useLoginUser } from "./useLoginUser";

export const useAuth= ()=> {
    const navigate = useNavigate();
    const {
      currentUser,
      setCurrentUser
    } = useLoginUser();


    const login = useCallback( async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);  
      const res = await axios.post('http://localhost:1323/login',{
        nickname: data.get('nickname'),
        password: data.get('password'),
      })
      if(res === "OK" ){
        setCurrentUser(res);
        console.log(res);
        alert("成功")
        return 
      }else{
        return navigate("/signin")
      }
    },[]);

    return login
}