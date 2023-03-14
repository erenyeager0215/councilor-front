import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import { NavLink } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";

const settings = [
  {
    name: "マイプロフィール",
    path: "./profile",
  },
  {
    name: "ログアウト",
    path: "./signout",
  },
];

export const AccountIcon = ({ userInfo }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <NavLink to={setting.path}>
                <Typography textAlign="center">{setting.name}</Typography>
              </NavLink>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  );
};
