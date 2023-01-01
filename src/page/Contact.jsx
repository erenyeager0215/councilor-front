import { Form,useLoaderData,useFetcher } from "react-router-dom";
import {getContact, updateContact}from "../contacts"

export async function loader({params}){
    // pathの":contactId"がparams.contactIdとして渡される
    const contact = await getContact(params.contactId)
    if (!contact){
      throw new Response("",{
        status:404,
        statusText:"Not Found",
      });
    }
    return contact
}

export async function action({request,params}){
  let formData = await request.formData();
  return updateContact(params.contactId,{
    favorite:formData.get("favorite") === "true",
  })
}

function Favorite({ contact }) {
  const fetcher = useFetcher();
  // yes, this is a `let` for later
  let favorite = contact.favorite;
  // 下記を記述するとデータ更新より先にUIだけ変更が加えられる
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        // favoriteの値がtrueの場合はvalueをfalseに、falseの場合はtureを返す
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}


export const Contact=()=> {
    const contact = useLoaderData();  
    console.log(contact)

  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar || null}
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          {/* actionに指定した文字列へルーティングされる */}
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
          // method="post"をやらないとリストからデータが削除されない
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                /*eslint no-restricted-globals: ["error", "event"]*/
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

