import axios from "axios";
// import { useCallback, useState } from "react";

// export const useRankingOfCouncilors = () => {
//   const { ranking, SetRanking } = useState();
//   const getCouncilorRanking = useCallback(async () => {
//     const res = await axios
//       .get("http://18.183.142.189:8080/councilors/ranking")
//       .catch((e) => {
//         console.log(e);
//       });
//     SetRanking(res.data);
//   }, []);

//   return { getCouncilorRanking, ranking };
// };

export async function getRankingOfCouncilors() {
  const res = await axios
    .get("http://18.183.142.189:8080/councilors/ranking")
    .catch((e) => {
      console.log(e);
    });
  const rankingData = res.data;
  return rankingData;
}
