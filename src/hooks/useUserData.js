import axios from "axios";
// import { useCallback, useState } from "react";

// export const useUserData = () => {
//   const { userData, SetUserData } = useState();
//   const getUserData = useCallback(async () => {
//     const res = await axios
//       .get("http://18.183.142.189:8080/user-data")
//       .catch((e) => {
//         console.log(e);
//       });
//     SetUserData(res.data);
//   }, []);
//   return { getUserData, userData };
// };

export async function getUserOfData() {
  const res = await axios
    .get("http://18.183.142.189:8080/user-data")
    .catch((e) => {
      console.log(e);
    });
  const userData = res.data;
  return userData;
}
