import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactNode } from "react";
import { DevButton } from "./components/DevButton";
import { DevToolsControls } from "./components/DevToolsController";

type DevToolsProps = {
  children: ReactNode;
  enable: boolean;
};

export function DevTools({ children, enable = true }: DevToolsProps) {
  const [showDevTools, setShowDevTools] = useState(false);
  const [enableReactQueryDevtools, setEnableReactQueryDevtools] =
    useState(true);
  const [enableRouterDevtools, setEnableRouterDevtools] = useState(true);

  const toggleDevTools = () => {
    setShowDevTools(prev => !prev);
  };

  return (
    <>
      {children}
      {enable && (
        <>
          <DevButton onToggle={toggleDevTools} Class="border-2" />
          {showDevTools && (
            <>
              <DevToolsControls
                onToggleReactQuery={setEnableReactQueryDevtools}
                onToggleRouterDevtools={setEnableRouterDevtools}
              />
              {enableReactQueryDevtools && (
                <ReactQueryDevtools initialIsOpen={false} />
              )}
              {enableRouterDevtools && <TanStackRouterDevtools />}
            </>
          )}
        </>
      )}
    </>
  );
}
