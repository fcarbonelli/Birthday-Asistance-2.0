"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();


  const pathname = usePathname()
  const userId = pathname.slice(pathname.lastIndexOf('/') + 1);

  const [link, setLink] = useState("");
  const [publicName, setPublicName] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/friends`);
      const data = await response.json();

      const currentUrl = process.env.NEXT_PUBLIC_BASE_URL;
      if (window.URL) {
        setLink(currentUrl + "/invite/" + data.link);
      } else {
        setLink(currentUrl + "/invite/" + data.link);
      }
      setPublicName("");
      setIsPublic(data.isPublic);
    };

    const fetchPublicAccount = async () => {
      const response = await fetch(`/api/users/${userId}/friends`);
      const data = await response.json();

      if(data.isPublic) {
        const currentUrl = process.env.NEXT_PUBLIC_BASE_URL;
        setLink(currentUrl +"/invite/"+data.link);
        setPublicName(data.name);
      } else {
        router.push("/");
      }
      
    };

    if (session?.user.id) {
      fetchPosts();
    } else if(userId) {
      fetchPublicAccount();
    }
  }, [session?.user.id, userId]);
  

  return (
    <Profile
      name={publicName}
      desc='Simply share the unique link provided below with your friends, and we will make sure you receive timely notifications for their upcoming birthdays.'
      data={link}
      isPublic={isPublic}
    />
  );
};

export default MyProfile;
