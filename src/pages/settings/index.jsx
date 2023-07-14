import { Spinner } from 'flowbite-react'
import React, { useState } from 'react'
import EyeIcon from '../../assets/EyeIcon'
import Toast from '../../components/Toast'
import usePrivateAxios from '../../hooks/usePrivateAxios'

const Settings = () => {
  const privateAxios = usePrivateAxios()
  const [showingPassword, setShowingPassword] = useState(false)
  const [showingNewPassword, setShowingNewPassword] = useState(false)
  const [showingConfirmNewPassword, setShowingconfirmNewPassword] = useState(false)
  const [loginData, setLoginData] = useState({ password: '', newPassword: '', confirmNewPassword: '' })
  const [showingError, setShowingError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [showingToast, setShowingToast] = useState(false)
  const handleLoginDataChange = (e) => {
    const { name, value } = e.target
    setLoginData(prevData => { return { ...prevData, [name]: value } })
  }
  const changePassword = () => {
    console.log(errorMessages);
    if (errorMessages.newPassword || errorMessages.confirmNewPassword) {
      setShowingError(true)
      return
    }
    setSubmitting(true)
    privateAxios.put(`/api/v1/user/change-password/${loginData.newPassword}`)
      .then(response => { console.log(response); setShowingToast(true) })
      .catch(error => console.log(error))
      .finally(() => setSubmitting(false))
  }

  const errorMessages = {
    newPassword: loginData.newPassword.length < 6 ? 'Password should contain more than 6 characters' : '',
    confirmNewPassword: loginData.newPassword !== loginData.confirmNewPassword ? 'Password does not match' : '',
  }
  return (
    <section className='flex justify-center py-4 lg:mx-8 gap-6'>
      <div className='border-gray-400 rounded max-w-7xl w-full space-y-8 bg-gray-50 py-4 px-8'>
        <h1 className='text-3xl font-semibold text-gray-500'>User settings</h1>
        <h1 className='text-2xl font-bold'>Change user password:</h1>
        <div className='pl-4 space-y-8'>
          <div className='relative space-y-2'>
            <label className='font-semibold pl'>Current password:</label>
            <input type={showingPassword ? 'text' : 'password'} className='pb-2 pt-4 text-lg px-2 bg-gray-50 border-b-2 focus:outline-gray-200 w-full pr-12' name='password' id='password' placeholder='Current password'
              onChange={handleLoginDataChange} />
            {loginData.password && <button className='absolute top-11 right-3 text-gray-400 hover:text-gray-800 bg-gray-50 z-10'
              onClick={() => setShowingPassword(prevState => !prevState)}>
              <EyeIcon style='w-6 h-6' isOn={showingNewPassword} />
            </button>}
          </div>

          <div className='relative space-y-2'>
            <label className='font-semibold pl'>New password:</label>
            <input type={showingNewPassword ? 'text' : 'password'} className='pb-2 pt-4 text-lg px-2 bg-gray-50 border-b-2 focus:outline-gray-200 w-full pr-12' name='newPassword' id='newPassword' placeholder='New password'
              onChange={handleLoginDataChange} />
            {loginData.password && <button className='absolute top-11 right-3 text-gray-400 hover:text-gray-800 bg-gray-50 z-10'
              onClick={() => setShowingNewPassword(prevState => !prevState)}>
              <EyeIcon style='w-6 h-6' isOn={showingNewPassword} />
            </button>}
            <div className='text-orange-accent text-sm'>{showingError && errorMessages.newPassword}</div>

          </div>

          <div className='relative space-y-2'>
            <label className='font-semibold pl'>Confirm password:</label>
            <input type={showingConfirmNewPassword ? 'text' : 'password'} className='pb-2 pt-4 text-lg px-2 bg-gray-50 border-b-2 focus:outline-gray-200 w-full pr-12' name='confirmNewPassword' id='confirmNewPassword' placeholder='Confirm new password'
              onChange={handleLoginDataChange} />
            {loginData.password && <button className='absolute top-11 right-3 text-gray-400 hover:text-gray-800 bg-gray-50 z-10'
              onClick={() => setShowingconfirmNewPassword(prevState => !prevState)}>
              <EyeIcon style='w-6 h-6' isOn={showingConfirmNewPassword} />
            </button>}
            <div className='text-orange-accent text-sm'>{showingError && errorMessages.confirmNewPassword}</div>

          </div>
        </div>
        <div className='flex justify-center'>
          <button className='button-contained-square'
            onClick={changePassword}>
            {
              submitting ?
                <Spinner color='success' />
                : <span>Change password</span>
            }
          </button>
        </div>
      </div>
      {showingToast && <Toast message='Change password successfully' direction='right' />}
    </section>
  )
}

export default Settings