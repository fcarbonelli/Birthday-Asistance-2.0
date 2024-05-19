"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const pathname = usePathname()
  const link = pathname.slice(pathname.lastIndexOf('/') + 1);

  const [submitting, setIsSubmitting] = useState(false);
  const [friend, setFriend] = useState({ name: "", day: "", month: "", sendEmail: true});
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/users/${link}/invite`);
        if (response.ok) {
          const responseData = await response.json();
          setName(responseData.name)
        } else {
          console.error('Error fetching data');
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [link]);

  const addFriend = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/users/${link}/invite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          friend: friend, 
        }),
      });

      if (response.ok) {
        setSent(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {!sent ? (
        <Form
          username={name}
          friend={friend}
          setFriend={setFriend}
          submitting={submitting}
          handleSubmit={addFriend}
        />
      ) : (
        <section className='w-full max-w-full flex-start flex-col'>
          <h1 className='mt-2 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-left'>
            <span className='blue_gradient'>Thank you!</span>
          </h1>
          <p className='desc text-left max-w-md'>
            Your friend will receive an email when your birthday arrives.
          </p>

          <form
            className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
          >
            <div className='mx-3 mb-5 gap-4'>
              <p className='desc text-left max-w-md mb-5'>
              Want to try it yourself? Sign Up. Its free!
              </p>
              <button
                type='button'
                onClick={() => router.push("/")}
                className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
              >
                Create Account
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default CreatePrompt;
