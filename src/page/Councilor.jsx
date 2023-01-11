import { useLoaderData } from "react-router-dom";
import { getCouncilor, getQuestions } from "../councilors";

export async function loader({ params }) {
  // pathの":contactId"がparams.contactIdとして渡される
  const concilors = await getCouncilor(params.councilorId);
  const questions = await getQuestions(params.councilorId);
  if (!concilors) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  if (!questions) {
    throw new Response("質問はありませんでした")
  };
  return {concilors,questions} ;
}

// export async function action({request,params}){
//   let formData = await request.formData();
//   return updateContact(params.contactId,{
//     favorite:formData.get("favorite") === "true",
//   })
// }

export const Councilor = () => {
  const {concilors ,questions}= useLoaderData();
  return (
    <div>
      <h1>
      {concilors.name}
      <br />
      {concilors.address}
      <br />
      {concilors.id}
      <br />
      </h1>
      {questions.map((que)=>(
        <>
        <p>{que.overview}</p>
        <p>{que.category}</p>
        <p>{que.content}</p>
        </>
      ))}
    </div>
  );
};
