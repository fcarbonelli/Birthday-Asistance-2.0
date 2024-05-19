"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import EditForm from "@components/EditForm";

const UpdateFriend = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const friendId = searchParams.get("id");

  const [friend, setFriend] = useState();
  const [submitting, setIsSubmitting] = useState(false);
  const [receiveEmail, setReceiveEmail] = useState(true);

  useEffect(() => {
    const getFriendDetails = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/friends/${friendId}`);
      const data = await response.json();

      if (!response.ok) {
        router.push("/");
      }
      setFriend(data);
    };

    if (friendId && session?.user.id) { getFriendDetails(); }
    else if (status === "unauthenticated") { router.push("/"); }
  }, [session?.user.id]);

  const updateFriend = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!friendId) return alert("Missing Friend!");

    try {
      const response = await fetch(`/api/users/${session.user.id}/friends/${friendId}`, {
        method: "PATCH",
        body: JSON.stringify({
          sendEmail: receiveEmail,
        }),
      });

      if (response.ok) {
        router.push(`/profile/${session.user.id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <EditForm
      type='Edit'
      friend={friend}
      setFriend={setFriend}
      setReceiveEmail={setReceiveEmail}
      submitting={submitting}
      handleSubmit={updateFriend}
    />
  );
};

export default UpdateFriend;
