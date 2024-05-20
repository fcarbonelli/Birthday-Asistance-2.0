"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if(!session) {
      router.push("/")
    }
  }, [session]); 

  return (
    <h1> Not available</h1>
  );
};

export default CreatePrompt;
