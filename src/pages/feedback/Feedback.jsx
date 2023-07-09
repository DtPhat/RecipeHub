import React, { useState } from 'react'
import usePrivateAxios from '../../hooks/usePrivateAxios'


const Feedback = () => {
  const privateAxios = usePrivateAxios()
  const [feedback, setFeedback] = useState({
    email: '',
    message: '',
  })
  console.log(feedback);
  const handleFeedbackChange = (e) => {
    let { name, value } = e.target
    setFeedback(feedback => ({ ...feedback, [name]: value }))
  }
  const sendFeedback = () => {
    privateAxios.post(`/api/v1/global/support-ticket`, feedback).then(response => console.log(response))
  }

  return (
    <section className='flex justify-center lg:mx-8 py-4 items-center'>
      <div className='max-w-8xl w-full flex flex-col px-8 py-4 gap-4 relative bg-gray-50'>
        <div className='flex justify-center pr-8'>
          <img src="/img/logo-text-bottom.png" alt="" className=' w-32 h-36 select-none' />
        </div>
        <div className='w-full flex justify-center'>
          <div className='flex flex-col space-y-8 w-full'>
            <h1 className='text-3xl font-bold text-green-accent'>Send support ticket to our system</h1>
            <div className='flex flex-col space-y-4'>
              <div>
                <input type="text" className='py-2 text-lg px-2 bg-gray-100 border-2 rounded outline-gray-500 w-full' name='email' id='email' placeholder='Email' onChange={handleFeedbackChange} />
                <span className='invisible text-sm'>Warning here</span>
              </div>
              <div>
                <textarea type="text" className='py-2 text-lg px-2 bg-gray-100 border-2 rounded outline-gray-500 w-full' rows='10' name='message' id='message' placeholder='Message' onChange={handleFeedbackChange} />
                <span className='invisible text-sm'>Warning here</span>
              </div>
              <div className='flex justify-center'>
                <button className='button-contained-square'
                  onClick={sendFeedback}>Send support ticket</button>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-center text-center border-b-2 border-green-accent relative mt-4'>
          <span className='absolute top-[-1rem] text-xl bg-gray-50 px-2'>or</span>
        </div>
        <div className='flex items-center justify-end gap-2'>
          <span className='text-2xl font-bold'>Contact us directly: </span>
          <a href='mailto:recipe.hub.12345@gmail.com'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id='email' fill='green' width="50"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"></path></svg>
          </a>
        </div>
      </div>
    </section >
  )
}

export default Feedback