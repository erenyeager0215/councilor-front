import { SimpleAccordion } from "../components/atoms/SimpleAccordion"
import { useLoaderData } from "react-router-dom";
import { getCouncilor, getQuestions } from "../councilors";
import CardMedia from "@mui/material/CardMedia";

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
    throw new Response("質問はありませんでした")
  };
  return {councilors,questions} ;
}



export const Councilor = () => {
  const {councilors ,questions}= useLoaderData();
  return (
    <div>
   <CardMedia
                  component="img"
                  height="140"
                  image={`${process.env.PUBLIC_URL}/${councilors.image}.jpg`} 
                  alt={`${councilors.image}`}
                />
      <h2>
      {councilors.name}
      <br />
      {councilors.address}
      <br />
      {councilors.id}
      <br />
      </h2>
      
      {questions.map((que)=>(
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
