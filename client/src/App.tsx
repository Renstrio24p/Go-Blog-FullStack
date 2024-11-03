import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./gen/routeTree.gen.ts";
import Hydrate from "./server/Hydrate.tsx";
import NotFound404 from "./pages/404/NotFound.tsx";
import { ToastContainer } from "react-toastify";

export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound404,
});

type Props = {};

export default function App({}: Props) {
  return (
    <Hydrate>
      <RouterProvider router={router} />
      <ToastContainer />
    </Hydrate>
  );
}
