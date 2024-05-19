import Link from "next/link";
import React, { useState } from 'react';

const Form = ({ username, friend, setFriend, submitting, handleSubmit }) => {

  const [name, setName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
    setFriend({ ...friend, name: event.target.value });
  };

  const handleDayChange = (event) => {
    setDay(event.target.value);
    setFriend({ ...friend, day: event.target.value });
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
    setFriend({ ...friend, month: event.target.value });
  };

  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='mt-2 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-left'>
        <span className='blue_gradient'>{username} <br />sent you an invite!</span>
      </h1>
      <p className='desc text-left max-w-md'>
        Share your birthdate with your friend and let him know when to say hi!
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Insert your name
          </span>

          <input
            value={name}
            onChange={handleNameChange}
            placeholder='Your name'
            required
            className='form_textarea '
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Select your birthdate
          </span>
          <div className="flex gap-x-2">
            <select
            id="day"
            required
            value={day}
            onChange={handleDayChange}
            className="block mt-1 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
            >
            <option value="">Select Day</option>
            {Array.from({ length: 31 }, (_, index) => (
                <option key={index + 1} value={index + 1}>{index + 1}</option>
            ))}
            </select>

            <select
                id="month"
                required
                value={month}
                onChange={handleMonthChange}
                className="block mt-1 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
            >
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
            </select>
        </div>
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `Saving` : "Confirm"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
