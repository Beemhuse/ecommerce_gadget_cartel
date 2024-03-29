import React from 'react'

export default function index() {
  return (
    <>
    
        <h1 className='font-bold text-3xl text-center my-8 border-b-2 py-3 mx-auto'>Contact us</h1>
    <div className='flex items-center justify-between px-[6rem]'>
         <form className='w-2/5 m-auto'>
            <div class="mb-4">
                <label for="name" class="block text-gray-700 font-semibold">Name</label>
                <input type="text" id="name" name="name" class="w-full px-3 py-2 border border-gray-300 rounded-md
                    focus:outline-none focus:border-indigo-500" placeholder="Your Name" required />
            </div>
            <div class="mb-4">
                <label for="email" class="block text-gray-700 font-semibold">Email</label>
                <input type="email" id="email" name="email" class="w-full px-3 py-2 border border-gray-300 rounded-md
                    focus:outline-none focus:border-indigo-500" placeholder="Your Email" required />
            </div>
            <div class="mb-4">
                <label for="message" class="block text-gray-700 font-semibold">Message</label>
                <textarea id="message" name="message" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md
                    focus:outline-none focus:border-indigo-500" placeholder="Your Message" required></textarea>
            </div>
            <div class="mt-4">
                <button type="submit" class="w-full bg-black text-white font-semibold py-2 px-4 rounded-md
                    hover:bg-black transition duration-300">Send Message</button>
            </div>
        </form>
        
<div className='w-2/4'>
    <h2 className='text-center text-3xl my-5 font-bold'>We Want to Hear From You</h2>
    <p>Your feedback matters to us. Whether you have a question, suggestion, or just want to say hi, we're all ears. Get in touch with us today, and let's start a conversation.</p>
</div>

    </div>
    </>
  )
}
