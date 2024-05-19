import Link from "next/link";
import React, { useState } from 'react';

const EditForm = ({ type, friend, setFriend, setReceiveEmail, submitting, handleSubmit }) => {

  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='mt-2 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-left'>
        <span className='blue_gradient'>{type} friend</span>
      </h1>
      <p className='desc text-left max-w-md'>
        Customize friend details
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Friend name
          </span>

          <input
            value={friend?.name}
            placeholder='Your name'
            readOnly
            className='form_textarea '
            style={{ cursor: 'not-allowed' }}
          />
        </label>

        <label>
            <span className='font-satoshi font-semibold text-base text-gray-700'>
                Select if you want to receieve an email for this friend:
            </span>
            <div className="flex gap-x-2">

                <select
                    id="month"
                    required
                    className="block mt-1 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    onChange={(e) => setReceiveEmail(e.target.value)}
                >
                    <option value="true" selected={friend?.sendEmail === true}>Yes</option>
                    <option value="false" selected={friend?.sendEmail === false}>No, i don't want to remember this birthday</option> 
                </select>
            </div>
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `Saving` : "Save"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditForm;
