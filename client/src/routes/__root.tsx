import { createRootRoute, Outlet } from "@tanstack/react-router";
import { DevTools } from "@/server/DevTools.tsx";
import "react-toastify/dist/ReactToastify.css";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  const isDevelopment = import.meta.env.MODE === "development";

  return (
    <DevTools enable={isDevelopment}>
      <main className=" bg-cyan-900 text-white w-full h-screen p-6">
        <Outlet />
      </main>
    </DevTools>
  );
}
