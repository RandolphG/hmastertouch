import React, { FC, Suspense } from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import { FlipText } from "../components";
import { Dashboard, Game, Home, Message, Scores, SignIn } from "../pages";

let index: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
    children: [
      { index: true, element: <Message /> },
      { path: "/signIn", element: <SignIn /> },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      { index: true, element: <Game /> },
      {
        path: "scores",
        element: <Scores />,
      },
    ],
  },
];

/**
 * Application Router
 * @returns {JSX.Element}
 */
const AppRouter: FC = () => {
  let element = useRoutes(index);

  return <Suspense fallback={<></>}>{element}</Suspense>;
};

export default AppRouter;
