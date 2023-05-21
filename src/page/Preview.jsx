import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export const Preview = () => {
  const location = useLocation();
  const userData = location.state.userData;
  console.log("test");
  console.log(location);
  console.log(userData);
  return (
    <>
      <Box>
        <Typography variant="h4">プレビュー画面</Typography>
        <Typography>ニックネーム: {userData.nickname}</Typography>
        <Typography>パスワード: {userData.password}</Typography>
        <Typography>
          生年月日: {userData.birthYear}-{userData.birthMonth}-
          {userData.birthDay}
        </Typography>
        <Typography>性別: {userData.gender}</Typography>
        <Typography>お住まい: {userData.home}</Typography>
      </Box>
      <RegestorBtn data={userData} />
    </>
  );
};

export const RegestorBtn = ({ data }) => {
  const navigate = useNavigate();
  const formattedBirthDate = new Date(
    data.birthYear,
    data.birthMonth - 1,
    data.birthDay + 1
  );
  const submitData = () => {
    axios
      .post("http://18.183.142.189:8080/register_user", {
        nickname: data.nickname,
        password: data.password,
        birthday: formattedBirthDate,
        gender: data.gender,
        home: data.home,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === "OK") {
          alert("アカウントが登録されました。ログインしてください");
          navigate("/signin");
        }
      })
      .catch((res) => {
        alert("失敗");
        navigate("/signup");
      });
  };
  return (
    <>
      <Button variant="contained" color="primary" onClick={submitData}>
        登録
      </Button>
    </>
  );
};
