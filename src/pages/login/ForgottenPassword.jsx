import { Modal, Spinner } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import axios from '../../api/axios'
import Toast from '../../components/Toast'

const ForgottenPassword = ({ openForgottenPasswordBox, setOpenForgottenPasswordBox }) => {
  const [forgottenEmail, setForgottenEmail] = useState('')
  const forgottenEmailRef = useRef()
  const [forgettenMessage, setForgottenMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [showingToast, setShowingToast] = useState(false)
  useEffect(() => {
    openForgottenPasswordBox && forgottenEmailRef.current.focus()
  }, [forgottenEmail]);

  const handleForgottenPassword = () => {
    setSubmitting(true)
    axios.put(`/api/v1/global/forgot-password`, { email: forgottenEmail }).then(response => console.log(response))
      .catch((error) => console.log(error))
      .finally(() => { setForgottenMessage('Please verify your email to get new password'); setSubmitting(false) })
    setForgottenEmail('')
  }
  return (
    <Modal dismissible show={openForgottenPasswordBox} onClose={() => { setOpenForgottenPasswordBox(false); setForgottenMessage('') }} size='5xl'>
      <Modal.Header />
      <Modal.Body >
        <section>
          <div className='space-y-4'>
            <div className='text-2xl font-semibold'>Please enter your email address to send new passowrd.</div>
            <span className='text-green-variant text-lg'>{forgettenMessage}</span>
            <input type="text" className='pb-2 pt-4 text-lg px-2 bg-container border-b-2 focus:outline-gray-200 w-full' placeholder='Email'
              value={forgottenEmail} onChange={(e) => setForgottenEmail(e.target.value)} ref={forgottenEmailRef} />
            <button className='button-contained-square space-x-4'
              onClick={handleForgottenPassword}>
              {
                submitting ?
                  <Spinner color='success' />
                  : <span className='font-semibold'>Send new password</span>
              }
            </button>
          </div>
        </section>
      </Modal.Body>
    </Modal>

  )
}

export default ForgottenPassword