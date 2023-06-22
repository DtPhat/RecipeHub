import React, { useState } from 'react'
import EyeIcon from '../../assets/EyeIcon'
import { useNavigate } from 'react-router-dom'
import RegisterCarousel from './RegisterCarousel'

const Register = () => {
  const [showingPassword, setShowingPassword] = useState(false)
  const [registerData, setRegisterData] = useState({
    fullname: '',
    email: '',
    password: '',
    birthdate: '',
    gender: 'male',
  })
  const navigate = useNavigate()

  const handleRegisterDataChange = (e) => {
    const { name, value } = e.target
    setRegisterData(prevData => { return { ...registerData, [name]: value } })
  }
  console.log(registerData)
  const style = {
    input: 'py-2 text-lg px-2 bg-gray-50 border-b-2 focus:outline-gray-200 w-full',
    radio: 'space-x-2 border border-gray-400 cursor-pointer flex justify-center w-24 rounded accent-green-600 hover:border-green-600',
  }
  return (
    <section className='flex justify-center mx-8 items-center'>
      <div className='max-w-8xl w-full flex h-[56rem] py-8 relative'>
        <div className='w-1/2 bg-green-variant rounded-l-xl relative '>
          <RegisterCarousel />
        </div>
        <div className='w-1/2 bg-gray-50 rounded-r-xl flex items-center justify-center px-4'>
          <div className='flex flex-col space-y-8 w-96'>
            <div>
              <h1 className='text-4xl pb-2 font-semibold text-center'>Create your account</h1>
              <div className='flex justify-center space-x-2 items-center'>
                <span className='text-gray-500'>Already have an account?</span>
                <button className='font-semibold text-lg hover:underline text-green-accent'
                  onClick={() => navigate('/login')}>Log in</button>
              </div>
            </div>
            <div className='flex flex-col space-y-4'>
              <div>
                <input type="text" className={style.input} name='fullname' id='fullname' placeholder='Full name' onChange={handleRegisterDataChange} />
                <span className='invisible text-sm'>Warning here</span>
              </div>
              <div>
                <input type="text" className={style.input} name='email' id='email' placeholder='Email' onChange={handleRegisterDataChange} />
                <span className='invisible text-sm'>Warning here</span>
              </div>
              <div className='relative'>
                <input type={showingPassword ? 'text' : 'password'} className={`${style.input} pr-12`} name='password' id='password' placeholder='Password'
                  onChange={handleRegisterDataChange} />
                {registerData.password && <button className='absolute top-3 right-3 text-gray-400 hover:text-gray-800 bg-gray-50 z-10'
                  onClick={() => setShowingPassword(prevState => !prevState)} >
                  <EyeIcon style='w-6 h-6' isOn={showingPassword} />
                </button>}
                <span className='invisible text-sm'>Warning here</span>
              </div>
              <div>
                <span className='pl-2 text-gray-500'>Date of birth</span>
                <input type="date" className={style.input} name='birthdate' id='birthdate' onChange={handleRegisterDataChange} />
              </div>
              <div className='py-2'>
                <span className='pl-2 text-gray-500'>Gender</span>
                <div className='flex justify-between px-2 pt-2'>
                  <label htmlFor="male" className={style.radio}>
                    <span>Male</span>
                    <input type='radio' value='male' name='gender' id='male' onChange={handleRegisterDataChange} />
                  </label>
                  <label htmlFor="female" className={style.radio}>
                    <span>Female</span>
                    <input type='radio' value='female' name='gender' id='female' onChange={handleRegisterDataChange} />
                  </label>
                  <label htmlFor="other" className={style.radio}>
                    <span>Other</span>
                    <input type='radio' value='other' name='gender' id='other' onChange={handleRegisterDataChange} />
                  </label>
                </div>
              </div>
              <div className='flex justify-center'>
                <button className='button-primary-2'>Sign up</button>
              </div>
            </div>
            <div className='flex justify-center text-center border-b-2 border-gray-300 relative'>
              <span className='absolute top-[-1rem] text-xl bg-gray-50 text-gray-500 px-2'>or</span>
            </div>
            <button className='button-secondary-2 flex items-center justify-center space-x-4'>
              <img src="/img/googleIcon.png" alt="google icon" className='w-6 h-6' />
              <span className='font-semibold'>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    </section >
  )
}

export default Register