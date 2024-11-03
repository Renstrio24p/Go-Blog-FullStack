import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { LinksTags } from "@/constants/LinkTags";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close the mobile menu
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="flex items-center justify-between w-full py-2 px-4 fixed top-0 left-0 right-0 bg-[#cfe2a2cc] shadow-md z-50">
      <div className="flex items-center gap-2">
        <img
          src="/tanstack.webp"
          alt="tanstack"
          className="w-12 h-12 rounded-full"
        />
        <div className="leading-tight flex flex-col justify-center">
          <h1 className="text-lg font-semibold">TanStack Router</h1>
          <p className="text-sm">with Vite + React + TypeScript</p>
        </div>
      </div>

      {/* Hamburger icon for mobile */}
      <button
        className="md:hidden text-2xl"
        onClick={toggleMenu}
        aria-label="Toggle Menu">
        ☰
      </button>

      {/* Desktop menu */}
      <nav className="hidden md:flex">
        <ul className="flex items-center gap-5">
          {LinksTags.map(link => (
            <li key={link.path}>
              <Link href={link.path} className="text-lg hover:text-gray-700">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile sliding menu */}
      <nav
        className={`md:hidden fixed top-0 left-0 h-full w-64 z-[999] bg-[#cfe2a2] p-6 transition-transform duration-500 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-40`}>
        <ul className="flex flex-col gap-4">
          {LinksTags.map(link => (
            <li key={link.path}>
              <Link
                href={link.path}
                className="text-lg hover:text-gray-700"
                onClick={closeMenu} // Close menu on link click
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <button
          className="mt-8 text-lg text-red-500"
          onClick={toggleMenu}
          aria-label="Close Menu">
          Close
        </button>
      </nav>

      {/* Background overlay when mobile menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleMenu}></div>
      )}
    </header>
  );
}
