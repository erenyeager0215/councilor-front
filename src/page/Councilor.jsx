import { SimpleAccordion } from "../components/atoms/SimpleAccordion";
import { useLoaderData } from "react-router-dom";
import { getCouncilor, getQuestions } from "../councilors";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useCheckUser } from "../hooks/useCheckAuth";
import { useFavorite } from "../hooks/useFavorite";
import { useLoginUser } from "../hooks/useLoginUser";

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
  const { onCheckUser } = useCheckUser();
  const [isSupport, setIsSupport] = useState(false);
  const { councilors, questions } = useLoaderData();
  const { postFavoriteCouncilor } = useFavorite();
  const { currentUser } = useLoginUser();

  const onClick = () => {
    onCheckUser();
    postFavoriteCouncilor(councilors.id, currentUser);
    return setIsSupport(!isSupport);
  };

  return (
    <div>
      <CardMedia
        component="img"
        image={`${process.env.PUBLIC_URL}/${councilors.imagepath}.jpg`}
        alt={`${councilors.image}`}
        sx={{ borderRadius: "16px" }}
      />

      <h2>{councilors.name}</h2>
      <div>
        {currentUser.favorite.councilor_id === councilors.id ? (
          <span>★</span>
        ) : (
          <Button variant="contained" disabled={isSupport} onClick={onClick}>
            この議員を支持する
          </Button>
        )}
      </div>
      <h3>
        <br />
        {councilors.address}
        <br />
        {councilors.id}
        <br />
      </h3>

      {questions.map((que) => (
        <>
          <SimpleAccordion overview={que.overview} key={que}>
            {que.content}
            <br />
            {que.answer}
          </SimpleAccordion>
        </>
      ))}
    </div>
  );
};
