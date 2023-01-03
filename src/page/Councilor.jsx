import { useLoaderData } from "react-router-dom";
import { getCouncilor } from "../councilors";

export async function loader({ params }) {
  // pathの":contactId"がparams.contactIdとして渡される
  const contact = await getCouncilor(params.councilorId);
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return contact;
}

// export async function action({request,params}){
//   let formData = await request.formData();
//   return updateContact(params.contactId,{
//     favorite:formData.get("favorite") === "true",
//   })
// }

export const Councilor = () => {
  const contact = useLoaderData();

  return (
    <div>
      <h1>
      {contact.data.name}
      <br />
      {contact.data.address}
      <br />
      {contact.data.id}
      </h1>
    </div>
  );
};
