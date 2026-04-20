"use client";
import CustomCursor from "./CustomCursor";
import LoadingScreen from "./LoadingScreen";
import PageTransition from "./PageTransition";

export default function ClientLayout({ children }) {
  return (
    <>
      <CustomCursor />
      <LoadingScreen />
      <PageTransition>{children}</PageTransition>
    </>
  );
}
