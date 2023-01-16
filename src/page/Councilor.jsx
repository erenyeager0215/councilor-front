import { SimpleAccordion } from "../components/atoms/SimpleAccordion";
import { useLoaderData } from "react-router-dom";
import { getCouncilor, getQuestions } from "../councilors";
import CardMedia from "@mui/material/CardMedia";
import Button from '@mui/material/Button';
import { useState } from "react";
import { useCheckUser } from "../hooks/useCheckAuth";

export async function loader({ params }) {
  // pathの":contactId"がparams.contactIdとして渡される
  const councilors = await getCouncilor(params.councilorId);
  const questions = await getQuestions(params.councilorId);
  if (!councilors) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  if (!questions) {
    throw new Response("質問はありませんでした");
  }
  return { councilors, questions };
}



export const Councilor = () => {
  const {onCheckUser}=useCheckUser();
  const [isSupport,setIsSupport]= useState(false);
  const { councilors, questions } = useLoaderData();

  const onClick =()=>{
    onCheckUser()
    return setIsSupport(!isSupport)
  }
  

  return (
    <div>
      <CardMedia
        component="img"
        image={`${process.env.PUBLIC_URL}/${councilors.image}.jpg`}
        alt={`${councilors.image}`}
        sx={{ borderRadius: "16px" }}
      />

      <Button  variant="contained" disabled={isSupport} onClick={onClick} >
        この議員を支持する
      </Button>
      
      <h2>
        {councilors.name}
        <br />
        {councilors.address}
        <br />
        {councilors.id}
        <br />
      </h2>

      {questions.map((que) => (
        <>
          <SimpleAccordion overview={que.overview}>
            {que.content}
            <br />
            {que.answer}
          </SimpleAccordion>
        </>
      ))}
    </div>
  );
};
