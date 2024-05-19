"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ friend, daysLeft, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex justify-start gap-3'>
          <div className='flex flex-col mr-8'>
            <p className='font-inter text-sm text-gray-500'>
              {friend.month +", "+friend.day}
            </p>
            <h3 className='font-satoshi text-md font-semibold text-gray-900 pb-1'>
              {friend.name}
            </h3>
            <h3 className='font-inter text-sm font-italic text-gray-600'>
              Days Left: {daysLeft}
            </h3>
          </div>
        </div>
        <div className='flex-1 flex flex-row-reverse items-center gap-3'>
        {session?.user.id && (
          <div className='flex mt-6 mr-4'>
            <p
              className='font-inter text-sm green_gradient cursor-pointer mr-4'
              onClick={() => handleEdit(friend._id)}
            >
              Edit
            </p>
            <p
              className='font-inter text-sm orange_gradient cursor-pointer'
              onClick={() => handleDelete(friend._id)}
            >
              Delete
            </p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
