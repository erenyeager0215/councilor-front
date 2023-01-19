import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import { useNavigate } from "react-router-dom";


export const LabelBottomNavigation = () => {
  const [value, setValue] = React.useState("home");
  const navigate = useNavigate();


  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(`/${newValue}`);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        sx={{ width: 500 }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="ホーム"
          value=""
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="議員一覧"
          value="councilors"
          icon={<PeopleIcon />}
        />
        <BottomNavigationAction
          label="一般質問"
          value="questions"
          icon={<QuestionAnswerIcon />}
        />
        <BottomNavigationAction
          label="各種データ"
          value="data"
          icon={<InsertChartIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};
