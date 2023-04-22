import React, { useRef, useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { LinkComponent } from "../components/atoms/LinkComponent";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const radioBtnOfGender = {
  label: "性別",
  branch: [
    {
      value: "male",
      letter: "男性",
    },
    {
      value: "female",
      letter: "女性",
    },
    {
      value: "other",
      letter: "その他",
    },
  ],
};

const radioBtnOfHome = {
  label: "お住まい",
  branch: [
    {
      value: "InCity",
      letter: "市内",
    },
    {
      value: "OutOfCity",
      letter: "市外",
    },
  ],
};

const theme = createTheme();

export const SignUp = () => {
  const [value, setValue] = useState();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("birthday", value);
    axios
      .post("http://localhost:1323/register_user", {
        nickname: data.get("nickname"),
        password: data.get("password"),
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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            新規登録
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="nickname"
              label="ニックネーム"
              name="nickname"
              autoComplete="nickname"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <BirthDate />
            <ControlledRadioButtonsGroup props={radioBtnOfGender} />
            <ControlledRadioButtonsGroup props={radioBtnOfHome} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              loading="loading"
              disabled={TextField.length < 1}
              sx={{ mt: 3, mb: 2 }}
            >
              新規登録
            </Button>
            <Grid container>
              <Grid item>
                <LinkComponent to="/signin" variant="body2">
                  ログイン
                </LinkComponent>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export const ControlledRadioButtonsGroup = ({ props }) => {
  const [value, setValue] = useState("male");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">
        {props.label}
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        {props.branch.map((data) => (
          <>
            <FormControlLabel
              value={data.value}
              control={<Radio />}
              label={data.letter}
            />
          </>
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export const BirthDate = () => {
  const birthYearRef = useRef(null);
  const birthMonthRef = useRef(null);
  const birthDayRef = useRef(null);

  const [birthYear, setBirthYear] = useState();
  const [birthMonth, setBirthMonth] = useState();
  const [birthDay, setBirthDay] = useState();

  const setYear = () => {
    for (let i = new Date().getFullYear(); 1920 <= i; i--) {
      const option = document.createElement("option");
      option.value = `${i}`;
      option.text = `${i}`;
      // ref.currentでDOMに直接アクセスできる
      birthYearRef.current.appendChild(option);
    }
  };

  const setMonth = () => {
    for (let i = 1; i <= 12; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.text = i;
      birthMonthRef.current.appendChild(option);
    }
  };

  const setDay = () => {
    for (let i = 1; i <= 31; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.text = i;
      birthDayRef.current.appendChild(option);
    }
  };

  const selectBirthYear = (e) => {
    setBirthYear(e.target.value);
  };

  const selectBirthMonth = (e) => {
    setBirthMonth(e.target.value);
  };

  const selectBirthDay = (e) => {
    setBirthDay(e.target.value);
  };

  useEffect(() => {
    setYear();
    setMonth();
    setDay();
  }, []);

  return (
    <div>
      <p>生年月日</p>
      <label>
        <select
          ref={birthYearRef}
          value={birthYear}
          onChange={selectBirthYear}
        ></select>
        年
      </label>
      <label>
        <select
          ref={birthMonthRef}
          value={birthMonth}
          onChange={selectBirthMonth}
        ></select>
        月
      </label>
      <label>
        <select
          ref={birthDayRef}
          value={birthDay}
          onChange={selectBirthDay}
        ></select>
        日
      </label>
    </div>
  );
};
