"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  if(!session) {
    router.push("/")
  }

  return (
    <h1> Not available</h1>
  );
};

export default CreatePrompt;
