import { useState } from "react";

type DevToolsControlsProps = {
  onToggleReactQuery: (enabled: boolean) => void;
  onToggleRouterDevtools: (enabled: boolean) => void;
};

export function DevToolsControls({
  onToggleReactQuery,
  onToggleRouterDevtools,
}: DevToolsControlsProps) {
  const [enableReactQueryDevtools, setEnableReactQueryDevtools] =
    useState(true);
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

  return (
    <div className="p-6 fixed bottom-36 right-4 bg-green-100 rounded-lg border-2 border-green-300 shadow-md">
      <h1 className="text-xl font-semibold mb-4 text-green-800">
        TanStack DevTools
      </h1>
      <div className="flex flex-col gap-4">
        <label className="flex items-center gap-2 text-gray-700">
          <input
            type="checkbox"
            checked={enableReactQueryDevtools}
            onChange={handleReactQueryChange}
            className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer checked:bg-green-500 checked:border-transparent"
          />
          <span className="text-sm text-orange-600 font-medium">
            Enable React Query Devtools
          </span>
        </label>

        <label className="flex items-center gap-2 text-gray-700">
          <input
            type="checkbox"
            checked={enableRouterDevtools}
            onChange={handleRouterDevtoolsChange}
            className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer checked:bg-green-500 checked:border-transparent"
          />
          <span className="text-sm text-green-600 font-medium">
            Enable TanStack Router Devtools
          </span>
        </label>
      </div>
    </div>
  );
}
