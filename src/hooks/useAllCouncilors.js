import {useState,useCallback} from "react"
import axios from "axios"

export const useAllCouncilors=()=>{
   const [councilors,setCouncilors]= useState([]);

   async function getCouncilors(){
      const res = await axios.get(`http://localhost:1323/councilors`)
      setCouncilors(res.data);
     }
     return {getCouncilors,councilors}
}

