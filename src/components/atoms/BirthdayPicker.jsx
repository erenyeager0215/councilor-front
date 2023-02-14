import * as React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ja from "date-fns/locale/ja";
export const BirthdayPicker=(props)=> {


  return (
    <>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={ja}
        localeText={{
          previousMonth: "前月",
          nextMonth: "次月"
        }}
      >
        {props.children}
        
    
      </LocalizationProvider>
     
    </>
  );
}
