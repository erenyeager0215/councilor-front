import axios from "axios"
import { useCallback } from "react"


export const useFavorite=()=>{
     const postFavoriteCouncilor = useCallback(async (councilor_id,user_id)=>{
       const res = await axios.post(`http://localhost:1323/favorite/councilor`,{
        user_id:user_id,
        councilor_id:councilor_id
    }).catch(e=>{
        console.log(e)
       })
       console.log(res)
    },[])



    return {postFavoriteCouncilor}
}