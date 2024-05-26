
const Privacy = () => {
  return (
    <>
        <section className='w-full max-w-full flex-start flex-col'>
            <h1 className='mt-2 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-left'>
            <span className='blue_gradient'>Privacy</span>
            </h1>
            <p className='desc text-left max-w-md'>
            Effective Date: 5/26/2024
            </p>

            <form
            className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
            >
            <div className='mx-3 mb-5 gap-4'>
                <p className="desc text-left max-w-md mb-5">Introduction</p>
                <p className='desc text-left max-w-md mb-5'>
                Birthday Assistance ("we," "us," or "our") is an app that helps you remember your friends' birthdays and sends you email reminders.
                 This privacy policy explains how we collect, use, disclose, and safeguard your information when you use our app.
                </p>
                <p className="desc text-left max-w-md mb-5">Information We Collect</p>
                <p className='desc text-left max-w-md mb-5'>
                We collect the following information when you register for our app:

                    -Email address: This is used to send you reminders about your friends' birthdays. <br />
                    We do not collect any of the following: <br />

                    -Contact information: We do not store your friends' birthdays or any contact information you enter into the app. <br />
                    -Device information: We do not collect any information about your device. <br />
                    -Usage data: We do not collect any data about how you use our app. <br />
                </p>
                <p className="desc text-left max-w-md mb-5">How We Use Your Information</p>
                <p className='desc text-left max-w-md mb-5'>
                    We use the email address you provide to send you email reminders about your friends' birthdays. We will not share your email address with any third-party companies.
                </p>
                <p className="desc text-left max-w-md mb-5">Data Storage and Security</p>
                <p className='desc text-left max-w-md mb-5'>
                We store your email address in a MongoDB database. We use industry-standard security measures to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no internet transmission or electronic storage method is 100% secure. Therefore, we cannot guarantee absolute security.
                </p>
                <p className="desc text-left max-w-md mb-5">Contact Us</p>
                <p className='desc text-left max-w-md mb-5'>
                If you have any questions about this privacy policy, please contact us at carbonelli.francisco@gmail.com
                </p>

            </div>
            </form>
        </section>
    </>
  );
};

export default Privacy;