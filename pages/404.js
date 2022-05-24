import React from "react";
import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();
  const onBack = () => {
    router.push("/");
  };
  return (
    <>
      <div>404</div>
      <button onClick={() => onBack()}> back to home </button>
    </>
  );
}
