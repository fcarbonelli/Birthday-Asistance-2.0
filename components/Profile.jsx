import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import Feed from "@components/Feed";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

const Profile = ({ name, desc, data, isPublic }) => {
  const { data: session, status } = useSession();

  const [copied, setCopied] = useState(false);
  const [isPublicProfile, setIsPublicProfile] = useState(isPublic);

  useEffect(() => {
    setIsPublicProfile(isPublic);
  }, [isPublic]);

  const copyToClipboard = () => {
    const input = document.getElementById('linkInput');
    input.select();
    document.execCommand('copy');
    const selection = window.getSelection();
    selection.removeAllRanges();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); 
    
  };

  const handleToggle = async () => {
    const newIsPublicProfile = !isPublicProfile;
    setIsPublicProfile(newIsPublicProfile);

    // Trigger API call to update profile visibility
    try {
      const response = await fetch(`/api/users/${session.user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isPublic: newIsPublicProfile }),
      });

      if (!response.ok) {
        // Handle error response
        console.error('Failed to update profile visibility');
      }
    } catch (error) {
      // Handle network error
      console.error('An error occurred while updating profile visibility', error);
    }
  };

  return (
    <section className='w-full'>
      
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} {name ? " Profile" : "Share the link with friends"}</span>
      </h1>
      <p className='desc text-left'>{desc}</p>

      {!name && <div className="relative flex items-center mt-2 sm:w-1/2 w-full">
        <input
          id="linkInput"
          type="text"
          value={data}
          className="block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-4 pr-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          readOnly
        />
        
        <button
          onClick={copyToClipboard}
          className="absolute right-0 px-4 py-2 flex items-center text-gray-500 rounded-r-lg hover:bg-gray-200 focus:outline-none bg-white"
        >
          <ClipboardDocumentIcon className="w-6 mr-2" />
          {!copied && <span>Copy</span>}
          {copied && <span className="right-0 text-gray-500">Copied!</span>}
        </button>
      </div>}

      {!name && <div class="flex rounded font-inter text-sm text-gray-500 pt-4">
        <label class="relative inline-flex cursor-pointer items-center">
          <input id="switch" type="checkbox" class="peer sr-only" checked={isPublicProfile} onChange={handleToggle}/>
          <label for="switch" class="hidden"></label>
          <div class="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px]  after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
        </label>
        <p className="pt-1 pl-2 pr-1">Public Profile</p>

        <div className="group">
          <button class="text-gray-600 transition-colors duration-200 focus:outline-none dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
          </button>
          <span class=" items-center justify-center group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute opacity-0 mx-auto">Allow everyone to see your friends</span>
        </div>
      </div>}
     
      
      <Feed/>
    </section>
  );
};

export default Profile;
