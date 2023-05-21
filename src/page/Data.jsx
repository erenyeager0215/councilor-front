import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getUserOfData } from "../hooks/useUserData";
import { CircleGraph } from "../components/atoms/CircleGraph";
import { getRankingOfCouncilors } from "../hooks/useRankingOfCouncilors";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  const rankingData = await getRankingOfCouncilors();
  const userData = await getUserOfData();
  return { rankingData, userData };
}

export const Data = () => {
  const { rankingData, userData } = useLoaderData();

  return (
    <>
      <h2>ユーザのお気に入り議員ランキング</h2>
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>議員名</TableCell>
              <TableCell align="right">19才以下</TableCell>
              <TableCell align="right">20代</TableCell>
              <TableCell align="right">30代</TableCell>
              <TableCell align="right">40代</TableCell>
              <TableCell align="right">50代</TableCell>
              <TableCell align="right">60代</TableCell>
              <TableCell align="right">70代</TableCell>
              <TableCell align="right">80代以上</TableCell>
              <TableCell align="right">合計</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rankingData.map((data) => (
              <TableRow
                key={data}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {data.name}
                </TableCell>
                <TableCell align="right">{data.under19}</TableCell>
                <TableCell align="right">{data.age_20s}</TableCell>
                <TableCell align="right">{data.age_30s}</TableCell>
                <TableCell align="right">{data.age_40s}</TableCell>
                <TableCell align="right">{data.age_50s}</TableCell>
                <TableCell align="right">{data.age_60s}</TableCell>
                <TableCell align="right">{data.age_70s}</TableCell>
                <TableCell align="right">{data.over80}</TableCell>
                <TableCell align="right">{data.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h2>年代別ユーザ数</h2>
      <CircleGraph props={userData} />
    </>
  );
};
