import * as React from "react";
import { useLoaderData } from "react-router-dom";
import { SimpleAccordion } from "../components/atoms/SimpleAccordion";
import axios from "axios";

export async function loader({ params }) {
  let res = await axios.get(
    `http://localhost:1323/questions/category/${params.category}`
  );
  const questions = res.data;
  return { questions };
}

export const QuestionsByCategory2 = () => {
  const { questions } = useLoaderData();
  return (
    <>
      <h2>{questions[0].category}</h2>
      {questions.map((que) => (
        <>
          <SimpleAccordion overview={que.overview} key={que}>
            <p>質問</p>
            <p>{que.content}</p>
            <br />
            <p>回答</p>
            <p>{que.answer}</p>
          </SimpleAccordion>
        </>
      ))}
    </>
  );
};
