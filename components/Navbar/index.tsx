"use client";
import Link from "next/link";
import React from "react";
import { HiMenu } from "react-icons/hi";
import { auth } from "../../lib/firebase";
import { LoginBtn, LogoutBtn } from "./buttons";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const Navbar = (props: Props) => {
  const { isOpen, setIsOpen } = props;
  return (
    <nav className="flex justify-between text-white bg-blue-400 top-0 left-0">
      <div className={isOpen ? "" : " w-full p-0 m-0"}>
        <button
          className="m-4 relative top-0 left-0"
          onClick={() => setIsOpen(!isOpen)}
        >
          <HiMenu size={30} />
        </button>
      </div>
      <div
        className={`bg-blue-400 fixed h-screen top-0 left-0 transition-all ${
          isOpen ? "w-1/2" : "w-0 h-0"
        }`}
      >
        <div className={isOpen ? "flex h-full w-full" : "hidden"}>
          <button
            className="fixed top-0 left-0 m-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            <HiMenu size={30} />
          </button>
          <ul className="mt-40 flex flex-col text-start items-center h-full w-full">
            <li className="my-3">
              <Link onClick={()=> setIsOpen(false)} href="/" className="font-bold text-2xl">
                Notes
              </Link>
            </li>
            {!auth.currentUser ? (
              <li className="my-3">
                <LoginBtn setIsOpen={setIsOpen} />
              </li>
            ) : (
              <li className="my-3">
                <LogoutBtn setIsOpen={setIsOpen} />
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
