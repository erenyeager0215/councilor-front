import * as React from "react";
import { useLoaderData } from "react-router-dom";
import { SimpleAccordion } from "../components/atoms/SimpleAccordion";
import { useCheckUser } from "../hooks/useCheckAuth";
import Button from "@mui/material/Button";
import axios from "axios";
import { useLoginUser } from "../hooks/useLoginUser";
import { useFavorite } from "../hooks/useFavorite";

export async function loader({ params }) {
  let res = await axios.get(
    `http://18.183.142.189:8080/questions/category/${params.category}`
  );
  const questions = res.data;
  const categoryId = parseInt(params.category, 10);
  return { questions, categoryId };
}

export const QuestionsByCategory = () => {
  const { questions, categoryId } = useLoaderData();
  const { onCheckUser } = useCheckUser();
  const { currentUser } = useLoginUser();
  const { postFavoriteCategory } = useFavorite();

  const onClick = () => {
    onCheckUser();
    postFavoriteCategory(categoryId, currentUser);
  };

  return (
    <>
      <h2>{questions[0].category}</h2>
      <div>
        {currentUser.favorite.category_id === categoryId ? (
          <span>★お気に入りのカテゴリです</span>
        ) : (
          <Button variant="contained" onClick={onClick}>
            お気に入り登録
          </Button>
        )}
      </div>
      {questions.map((que) => (
        <>
          <SimpleAccordion
            overview={que.overview}
            held_time={que.held_time}
            key={que}
          >
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
