// Preview.js
import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export const Preview = () => {
  const location = useLocation();
  const userData = location.state.userData;
  console.log("test");
  console.log(location);
  console.log(userData);
  return (
    <Box>
      <Typography variant="h4">プレビュー画面</Typography>
      <Typography>ニックネーム: {userData.nickname}</Typography>
      <Typography>パスワード: {userData.password}</Typography>
      <Typography>
        生年月日: {userData.birthYear}-{userData.birthMonth}-{userData.birthDay}
      </Typography>
      <Typography>性別: {userData.gender}</Typography>
      <Typography>お住まい: {userData.home}</Typography>
    </Box>
  );
};
