
import * as React from "react";
import { useLoaderData} from "react-router-dom";
import { getQuestionsByCategory } from "../councilors";


export async function loader({params}) {
  const res = await getQuestionsByCategory(params.category);
  const questions = res
  return {questions};
}



export const QuestionsByCategory = () => {
   const {questions}= useLoaderData()
    return (
    <>
     {questions.map((que)=>(
        <>
        <p>{que.overview}</p>
        <p>{que.category}</p>
        <p>{que.content}</p>
        </>
      ))}
    </>
  );
};
