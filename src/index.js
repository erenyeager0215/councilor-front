import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Root,
  //  loader as rootLoader,
  // action as rootAction,
} from "./routes/Root";
import ErrorPage from "./page/ErrorPage";
import { EditContact, action as editAction } from "./page/EditContact";
import { Contact, loader as contactLoader,action as contactAction } from "./page/Contact";
import { action as deleteAction } from "./routes/Delete";
import {Home} from "./page/Home"
import {Councilors, loader as councilorsLoader} from "./page/Councilors";
import {Councilor, loader as councilorLoader} from "./page/Councilor";
import {SignIn} from "./page/SignIn"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    //  loader: rootLoader,
    // action: rootAction,
    children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            loader: contactLoader,
            action:contactAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            loader: contactLoader,
            action: deleteAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
          {
            path: "councilors",
            element:<Councilors/>,
            loader: councilorsLoader,          
          },{
            path: "councilors/:councilorId",
            element: <Councilor />,
            loader: councilorLoader,
            // action: editAction,
          },{
            path: "signin",
            element:<SignIn/>,      
          },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
