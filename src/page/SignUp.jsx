import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
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
import { BirthdayPicker } from "../components/atoms/BirthdayPicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ContentCutOutlined } from "@mui/icons-material";

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

const theme = createTheme();

export const SignUp = () => {
  const [value, setValue] = React.useState();
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("birthday", value);
    axios
      .post("http://localhost:1323/register_user", {
        nickname: data.get("nickname"),
        password: data.get("password"),
        birthday: data.get("birthday"),
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
            <BirthdayPicker sx={{ mt: 2 }}>
              <DatePicker
                label="生年月日"
                mask="____年__月__日"
                inputFormat="yyyy年MM月dd日"
                openTo="year"
                views={["year", "month", "day"]}
                maxDate={new Date()}
                value={value}
                onOpen={() => {
                  if (value === null) {
                    setValue(new Date(1990, 0, 1));
                  }
                }}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </BirthdayPicker>
            <button onClick={() => setValue(null)}>リセット</button>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
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
