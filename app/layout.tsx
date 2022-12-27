"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar/index";
import "../styles/globals.css";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebase";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  if (!auth.currentUser === null) {
    router.push("/login");
  }
  return (
    <html>
      <head />
      <body className="w-screen flex flex-col ">
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
        {children}
      </body>
    </html>
  );
}
