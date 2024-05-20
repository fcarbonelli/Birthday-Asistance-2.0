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
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/friends`);
      const data = await response.json();

      if (window.URL) {
        const url = new URL(currentUrl);
        const baseUrl = `${url.origin}`;
        setLink(baseUrl + "/invite/" + data.link);
      } else {
        const baseUrl = currentUrl.split('/')[0];
        setLink(baseUrl + "/invite/" + data.link);
      }
      setPublicName("");
      setIsPublic(data.isPublic);
    };

    const fetchPublicAccount = async () => {
      const response = await fetch(`/api/users/${userId}/friends`);
      const data = await response.json();

      if(data.isPublic) {
        //const currentUrl = window.location.href;
        const baseUrl = currentUrl.slice(0, currentUrl.lastIndexOf('/'));
        setLink(baseUrl +"/invite/"+data.link);
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
