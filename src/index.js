import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./routes/Root";
import ErrorPage from "./page/ErrorPage";
import { Home } from "./page/Home";
import { Councilors, loader as councilorsLoader } from "./page/Councilors";
import { Councilor, loader as councilorLoader } from "./page/Councilor";
import { SignIn } from "./page/SignIn";
import { SignUp } from "./page/SignUp";
import { Data } from "./page/Data";
import {
  QuestionsHome,
  loader as categorylistLoader,
} from "./page/QuestionsHome";
import {
  QuestionsByCategory,
  loader as questionsLoader,
} from "./page/QuestionsByCategory";
import { LoginUseProvider } from "./provider/LoginUseProvider";
import { loader as homeLoader } from "./page/Home";
import { loader as dataLoader } from "./page/Data";

import {
  QuestionsByCategory2,
  loader as questionsByCategory2Loader,
} from "./page/QuestionsByCategory2";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "councilors",
        element: <Councilors />,
        loader: councilorsLoader,
      },
      {
        path: "councilors/:councilorId",
        element: <Councilor />,
        loader: councilorLoader,
        // action: editAction,
      },
      {
        path: "questions",
        element: <QuestionsHome />,
        loader: categorylistLoader,
      },
      {
        path: "questions/:category",
        element: <QuestionsByCategory />,
        loader: questionsLoader,
      },
      {
        path: "questions/category/:category",
        element: <QuestionsByCategory2 />,
        loader: questionsByCategory2Loader,
      },
      {
        path: "data",
        element: <Data />,
        loader: dataLoader,
      },
    ],
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoginUseProvider>
      <RouterProvider router={router} />
    </LoginUseProvider>
  </React.StrictMode>
);
