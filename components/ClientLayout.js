"use client";
import { useState } from "react";
import CustomCursor from "./CustomCursor";
import LoadingScreen from "./LoadingScreen";
import PageTransition from "./PageTransition";

export default function ClientLayout({ children }) {
  const [ready, setReady] = useState(false);

  return (
    <>
      <CustomCursor />
      <LoadingScreen onDone={() => setReady(true)} />
      {ready && <PageTransition>{children}</PageTransition>}
    </>
  );
}
