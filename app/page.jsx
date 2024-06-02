"use client";

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Features from "@components/Features";
import Link from 'next/link';

const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(`/profile/${session.user.id}`);
    }
  }, [status]);
  
  return (<section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
      Connect & Invite
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'> Never Forget a Birthday</span>
    </h1>
    <p className='desc text-center'>
      Easily remember and celebrate your friends' birthdays. Set reminders, customize messages, and stay connected with those who matter.
    </p>
    <div className="flex justify-center lg:p-4 mt-10">
      <img className="rounded-lg lg:w-3/4 border" src="assets/images/bdaylanding.png"></img>
    </div>
    <Features/>
    <footer className=" ">
        <div className="container px-6 pb-8 mx-auto">
            <hr className="my-10 border-gray-200 " />
            <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                <div className="flex flex-col flex-row sm:items-center">
                    <div className="mb-2 sm:mb-4">
                        <p className="text-sm text-gray-500">Made with ❤ by <a href="https://twitter.com/francis_vesica" target="_blank" rel="noopener noreferrer" class="text-blue-500">@francis_vesica</a></p>
                    </div>
                    <div className="flex mb-1">
                      <Link href="/privacy">
                        <p className="text-sm text-gray-500 mr-2 cursor-pointer">Privacy</p>
                      </Link>
                      <Link href="/terms">
                        <p className="text-sm text-gray-500 cursor-pointer">Terms Of Service</p>
                      </Link>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">© Copyright 2024. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  </section>
)};

export default Home;
