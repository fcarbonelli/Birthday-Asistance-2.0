export default function Features() {
    return (
      <section>
          <div class="relative items-center w-full px-5 pt-24 pb-10 mx-auto md:px-12 lg:px-16 max-w-7xl">
              <div className='w-full flex-center flex-col'>
                  <h1 className='text-5xl font-semibold leading-[1.15] text-black sm:text-6xl text-center mb-2'>
                    Say goodbye to forgotten birthdays and awkward greetings.
                  </h1>
                  
              </div>
  
              
              <div>
                  <div className="pt-12 mx-auto lg:max-w-7xl">
                      <dl className="grid grid-cols-1 gap-6 space-y-0 lg:gap-24 lg:grid-cols-3">
                      <div>
                          <div>
                          <p className="text-lg font-medium leading-6 text-black">
                            Invite Friends 🎈
                          </p>
                          </div>
                          <div className="mt-2 desc text-base text-gray-500">
                            Share your unique invite link with friends. They click the link and securely add their birthday information - it's that easy!
                          </div>
                      </div>
                      <div>
                          <div>
                          <p className="text-lg font-medium leading-6 text-black">
                            Never Miss a Moment ⏰
                          </p>
                          </div>
                          <div className="mt-2 desc text-base text-gray-500">
                            Our app creates a private or public list of all your friends' birthdays.
                          </div>
                      </div>
                      <div>
                          <div>
                          <p className="text-lg font-medium leading-6 text-black">
                          Greet your friends 🎁
                          </p>
                          </div>
                          <div className="mt-2 desc text-base text-gray-500">
                            On the big day, you'll receive a friendly email reminder - no excuses for missed birthdays!
                          </div>
                      </div>
                      </dl>
                      <hr className="w-1/2 border-t border-gray-300 my-10 mx-auto"/>
                  </div>
              </div>
          </div>
      </section>            
    )
  }