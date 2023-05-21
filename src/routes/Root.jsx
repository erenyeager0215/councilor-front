import * as React from "react";
import { Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import { LabelBottomNavigation } from "../components/organisms/LabelBottomNavigation";
import { AccountIcon } from "../components/organisms/AccountIcon";
import { useLoginUser } from "../hooks/useLoginUser";

const pgObjs = [
  {
    name: "議員一覧",
    path: "./councilors",
  },
  {
    name: "一般質問",
    path: "./questions",
  },
  {
    name: "各種データ",
    path: "./data",
  },
  {
    name: "ログインする",
    path: "./signin",
  },
];

export const Root = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { currentUser } = useLoginUser();
  console.log(currentUser);

  const style = {
    paddingBottom: "60px",
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ○○市議会アプリ
            </Typography>

            <Box
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              component="main"
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pgObjs.map((pgObj) => (
                  <MenuItem key={pgObj.index}>
                    <NavLink to={pgObj.path}>
                      <Typography textAlign="center">{pgObj.name}</Typography>
                    </NavLink>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ○○市議会アプリ
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pgObjs.map((pgObj) => (
                <Button
                  key={pgObj.index}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <NavLink to={pgObj.path} style={{ color: "white" }}>
                    <Typography textAlign="center">{pgObj.name}</Typography>
                  </NavLink>
                </Button>
              ))}
            </Box>
            {currentUser.user_id > 0 ? (
              <AccountIcon userInfo={currentUser} />
            ) : (
              <></>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <main style={style}>
        <Outlet />
      </main>
      <LabelBottomNavigation />
    </>
  );
};
