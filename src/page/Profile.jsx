import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export async function loader() {}

export const Profile = () => {
  return (
    <>
      <BasicTextFields />
    </>
  );
};

export const BasicTextFields = () => {
  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            disabled
            id="outlined-disabled"
            label="Disabled"
            defaultValue="Hello World"
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <TextField
            id="outlined-read-only-input"
            label="Read Only"
            defaultValue="Hello World"
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
      </Box>
    </>
  );
};
