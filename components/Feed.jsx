"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick, onDelete }) => {

  const { data: session } = useSession();
  const router = useRouter();

  function monthToNumber(month) {
    const monthMap = {
        January: 1,
        February: 2,
        March: 3,
        April: 4,
        May: 5,
        June: 6,
        July: 7,
        August: 8,
        September: 9,
        October: 10,
        November: 11,
        December: 12
    };
    
    return monthMap[month];
  }

  function calculateDaysLeft(day, month) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; 
    const currentDay = currentDate.getDate();
    const currentYear = currentDate.getFullYear();
    
    const targetMonth = monthToNumber(month);
    const targetYear = currentMonth > targetMonth || (currentMonth === targetMonth && currentDay > day)
        ? currentYear + 1
        : currentYear;
    
    const targetDate = new Date(targetYear, targetMonth - 1, day); 
    
    const timeDifference = targetDate.getTime() - currentDate.getTime();
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); 
    
    return daysLeft;
  }

  let sortedData = data.sort((a, b) => {
    const daysLeftA = calculateDaysLeft(a.day, a.month);
    const daysLeftB = calculateDaysLeft(b.day, b.month);
    return daysLeftA - daysLeftB; // Sort ascending (least days left first)
  });

  const handleEdit = (friendId) => {
    router.push(`/update-friend?id=${friendId}`);
  };

  const handleDelete = async (friendId) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this friend?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/users/${session?.user.id}/friends`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-Friend-Id": friendId, // Custom header with friendId
          },
        });

        if (onDelete) {
          onDelete(sortedData.filter((item) => item._id !== friendId));
        }

      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className='prompt_layout'>
      {sortedData.map((post) => (
        <PromptCard
          key={post._id}
          friend={post}
          daysLeft={calculateDaysLeft(post.day, post.month)}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {

  const { data: session } = useSession();
  const pathname = usePathname()
  const userId = pathname.slice(pathname.lastIndexOf('/') + 1);

  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const handleDelete = (updatedData) => {
    setAllPosts(updatedData); 
  };

  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${session?.user.id}/friends`);
    const data = await response.json();

    setAllPosts(data.friends);
  };

  const fetchPublicAccount = async () => {
    const response = await fetch(`/api/users/${userId}/friends`);
    const data = await response.json();

    if(data.isPublic) {
      setAllPosts(data.friends);
    } else {
      router.push("/");
    }
    
  };

  useEffect(() => {
    if (session?.user.id) {
      fetchPosts();
    } else if(userId) {
      fetchPublicAccount();
    }
  }, [session?.user.id, userId]);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.name) ||
        regex.test(item.month)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className='feed'>
      <form className='relative w-full pb-4'>
        <p className="pl-1 font-inter text-sm text-gray-500"> Search Bar</p>
        <input
          type='text'
          placeholder='Search for a name or month'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      
      

      {/* All Friends */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
          onDelete={handleDelete}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} onDelete={handleDelete}/>
      )}
    </section>
  );
};

export default Feed;
