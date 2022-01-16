import { AnimatePresence } from "framer-motion";
import React, { FC, Suspense } from "react";
import { RouteObject, useRoutes } from "react-router-dom";
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
        path: "dashboard/scores",
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

  return (
    <Suspense fallback={<></>}>
      <AnimatePresence exitBeforeEnter initial={false}>
        {element}
      </AnimatePresence>
    </Suspense>
  );
};

export default AppRouter;
