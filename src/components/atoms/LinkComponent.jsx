import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import { React, memo } from "react";

export const LinkComponent = memo((props) => {
  return (
    <>
      <Link
        component={RouterLink}
        to={props.to} //遷移先
        color="primary"
      >
        {props.children}
      </Link>
    </>
  );
});
