"use client";


import Navbar from "@/component/Navbar";
import { ReactNode } from "react";

export default function ClientWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Navbar/> {/* This should render the Navbar */}
      {children} {/* Ensure children are rendered after the Navbar */}
    </>
  );
}
