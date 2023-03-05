import { React, memo } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const SimpleAccordion = memo((props) => {
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{props.overview}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{props.children}</Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
});
