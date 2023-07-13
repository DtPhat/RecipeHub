import React, { useState } from 'react'
import EyeIcon from '../../assets/EyeIcon'
import usePrivateAxios from '../../hooks/usePrivateAxios'

const Settings = () => {
  const privateAxios = usePrivateAxios()
  const [showingPassword, setShowingPassword] = useState(false)
  const [showingNewPassword, setShowingNewPassword] = useState(false)
  const [showingConfirmPassword, setShowingConfirmPassword] = useState(false)
  const [loginData, setLoginData] = useState({ password: '', newPassword: '', confirmNewPassword: '' })
  const [authenticationError, setAuthenticationError] = useState('')
  const handleLoginDataChange = (e) => {
    const { name, value } = e.target
    setLoginData(prevData => { return { ...prevData, [name]: value } })
  }
  const changePassword = () => {
    privateAxios.put(`/api/v1/user/change-password/${loginData.newPassword}`).then(response => console.log(response))
  }
  const errorMessages = {
    newPassword: loginData.password.length >= 6 ? '' : 'Password should contain more than 6 characters',
    confirmPassword: loginData.password === loginData.confirmNewPassword ? '' : 'Password does not match',
  }
  return (
    <section className='flex justify-center py-4 lg:mx-8 gap-6'>
      <div className='border-gray-400 rounded max-w-8xl w-full space-y-8 bg-gray-50 py-4 px-8'>
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
          </div>

          <div className='relative space-y-2'>
            <label className='font-semibold pl'>Confirm password:</label>
            <input type={showingConfirmPassword ? 'text' : 'password'} className='pb-2 pt-4 text-lg px-2 bg-gray-50 border-b-2 focus:outline-gray-200 w-full pr-12' name='confirmPassword' id='confirmPassword' placeholder='Confirm new password'
              onChange={handleLoginDataChange} />
            {loginData.password && <button className='absolute top-11 right-3 text-gray-400 hover:text-gray-800 bg-gray-50 z-10'
              onClick={() => setShowingConfirmPassword(prevState => !prevState)}>
              <EyeIcon style='w-6 h-6' isOn={showingConfirmPassword} />
            </button>}
          </div>
        </div>
        <div className='flex justify-center'>
          <button className='button-contained-square'
            onClick={changePassword}>Change password</button>
        </div>
      </div>
    </section>
  )
}

export default Settings