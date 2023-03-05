import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { CircleGraph } from "../components/atoms/CircleGraph";
import { getRankingOfCouncilors } from "../hooks/useRankingOfCouncilors";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  const rankingData = await getRankingOfCouncilors();
  console.log(rankingData);
  return { rankingData };
}

export const Data = () => {
  const { rankingData } = useLoaderData();
  console.log(rankingData);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 375 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>議員名</TableCell>
              <TableCell align="right">支持数</TableCell>
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
                <TableCell align="right">{data.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CircleGraph />
    </>
  );
};
