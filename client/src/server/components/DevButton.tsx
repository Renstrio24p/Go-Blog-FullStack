import { useState } from "react";

type DevButtonProps = {
  onToggle: () => void;
  Class: string;
};

export function DevButton({ onToggle, Class }: DevButtonProps) {
  const [showDevTools, setShowDevTools] = useState(false);

  const handleClick = () => {
    setShowDevTools(prev => !prev);
    onToggle();
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-20 right-4 p-2 ${showDevTools ? "bg-[#cfe2a2]" : "bg-blue-500"} rounded-lg ${Class}`}>
      <div className="flex items-center gap-2">
        <img src="/tanstack.webp" className="w-6 rounded-full" alt="" />
        {showDevTools ? (
          "Hide DevTools"
        ) : (
          <p className="text-white">Show DevTools</p>
        )}
      </div>
    </button>
  );
}
