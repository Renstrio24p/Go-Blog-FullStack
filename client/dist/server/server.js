import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React, { useState, useEffect, Suspense } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { createRootRoute, Outlet, createFileRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
function DevButton({ onToggle, Class }) {
  const [showDevTools, setShowDevTools] = useState(false);
  const handleClick = () => {
    setShowDevTools((prev) => !prev);
    onToggle();
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: handleClick,
      className: `fixed bottom-20 right-4 p-2 ${showDevTools ? "bg-[#cfe2a2]" : "bg-blue-500"} rounded-lg ${Class}`,
      children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("img", { src: "/tanstack.webp", className: "w-6 rounded-full", alt: "" }),
        showDevTools ? "Hide DevTools" : /* @__PURE__ */ jsx("p", { className: "text-white", children: "Show DevTools" })
      ] })
    }
  );
}
function DevToolsControls({
  onToggleReactQuery,
  onToggleRouterDevtools
}) {
  const [enableReactQueryDevtools, setEnableReactQueryDevtools] = useState(true);
  const [enableRouterDevtools, setEnableRouterDevtools] = useState(true);
  const handleReactQueryChange = () => {
    const newValue = !enableReactQueryDevtools;
    setEnableReactQueryDevtools(newValue);
    onToggleReactQuery(newValue);
  };
  const handleRouterDevtoolsChange = () => {
    const newValue = !enableRouterDevtools;
    setEnableRouterDevtools(newValue);
    onToggleRouterDevtools(newValue);
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-6 fixed bottom-36 right-4 bg-green-100 rounded-lg border-2 border-green-300 shadow-md", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold mb-4 text-green-800", children: "TanStack DevTools" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-gray-700", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            checked: enableReactQueryDevtools,
            onChange: handleReactQueryChange,
            className: "h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer checked:bg-green-500 checked:border-transparent"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-orange-600 font-medium", children: "Enable React Query Devtools" })
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-gray-700", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            checked: enableRouterDevtools,
            onChange: handleRouterDevtoolsChange,
            className: "h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer checked:bg-green-500 checked:border-transparent"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-green-600 font-medium", children: "Enable TanStack Router Devtools" })
      ] })
    ] })
  ] });
}
function DevTools({ children, enable = true }) {
  const [showDevTools, setShowDevTools] = useState(false);
  const [enableReactQueryDevtools, setEnableReactQueryDevtools] = useState(true);
  const [enableRouterDevtools, setEnableRouterDevtools] = useState(true);
  const toggleDevTools = () => {
    setShowDevTools((prev) => !prev);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    children,
    enable && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(DevButton, { onToggle: toggleDevTools, Class: "border-2" }),
      showDevTools && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          DevToolsControls,
          {
            onToggleReactQuery: setEnableReactQueryDevtools,
            onToggleRouterDevtools: setEnableRouterDevtools
          }
        ),
        enableReactQueryDevtools && /* @__PURE__ */ jsx(ReactQueryDevtools, { initialIsOpen: false }),
        enableRouterDevtools && /* @__PURE__ */ jsx(TanStackRouterDevtools, {})
      ] })
    ] })
  ] });
}
const Route = createRootRoute({
  component: Root
});
function Root() {
  const isDevelopment = false;
  return /* @__PURE__ */ jsx(DevTools, { enable: isDevelopment, children: /* @__PURE__ */ jsx("main", { className: " bg-cyan-900 text-white w-full h-screen p-6", children: /* @__PURE__ */ jsx(Outlet, {}) }) });
}
const IndexLazyImport = createFileRoute("/")();
const IndexLazyRoute = IndexLazyImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route
}).lazy(() => import("./assets/index.lazy-yGoux4y6.js").then((d) => d.Route));
const rootRouteChildren = {
  IndexLazyRoute
};
const routeTree = Route._addFileChildren(rootRouteChildren)._addFileTypes();
function Hydrate({ children }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const queryClient = new QueryClient();
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  if (!isHydrated) {
    return null;
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children }) });
}
function NotFound404() {
  return /* @__PURE__ */ jsx("section", { className: "w-full h-screen flex items-center justify-center  text-white", children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-[1.6em] font-semibold", children: [
      /* @__PURE__ */ jsx("h1", { children: "404" }),
      /* @__PURE__ */ jsx("p", { children: "|" }),
      /* @__PURE__ */ jsx("p", { children: "Page Not Found" })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-[1.2em] font-thin text-gray-300", children: "The page you are looking for does not exist." })
  ] }) });
}
const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFound404
});
function App({}) {
  return /* @__PURE__ */ jsxs(Hydrate, { children: [
    /* @__PURE__ */ jsx(RouterProvider, { router }),
    /* @__PURE__ */ jsx(ToastContainer, {})
  ] });
}
function render(_url, _ssrManifest, options) {
  return renderToPipeableStream(
    /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(Suspense, { fallback: "Loading...", children: /* @__PURE__ */ jsx(App, {}) }) }),
    options
  );
}
export {
  render
};
