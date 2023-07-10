import React, { useState } from 'react'
import EyeIcon from '../../assets/EyeIcon'
import { useNavigate } from 'react-router-dom'
import RegisterCarousel from './RegisterCarousel'
import axios from '../../api/axios'
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import ReactGA from 'react-ga';

const Register = () => {
  const [showingPassword, setShowingPassword] = useState(false)
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    fullName: '',
    profileImage: '',
    birthday: 0,
    gender: 'MALE',
  })
  const navigate = useNavigate()
  const [newAccount, setNewAccount] = useState()
  const handleRegisterDataChange = (e) => {
    let { name, value, type } = e.target
    if (type === 'date') {
      const birthdate = new Date(value)
      value = birthdate.getTime()
    }
    setRegisterData(registerData => {
      return { ...registerData, [name]: value }
    })
  }
  const signUp = () => {
    axios.post('/api/v1/auth/register', registerData).then(response => console.log(response)).catch(err => console.log(err.response))
  }
  const loginWithGoogle = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse.access_token),
    onError: (error) => console.log("Login fail", error)
  });
  const style = {
    input: 'py-2 text-lg px-2 bg-gray-50 border-b-2 focus:outline-gray-200 w-full',
    radio: 'space-x-2 border border-gray-400 cursor-pointer flex justify-center w-24 rounded accent-green-600 hover:border-green-600',
  }

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])

  return (
    <section className='flex justify-center mx-8 items-center'>
      <div className='max-w-8xl w-full flex h-[56rem] py-8 relative'>
        {/* <img src="/img/logo-text-bottom.png" alt="" className='absolute top-12 right-4 w-20 h-24 select-none' /> */}
        <div className='hidden md:block w-1/2 bg-green-variant rounded-l-xl relative '>
          <RegisterCarousel />
        </div>
        <div className='w-full md:w-1/2 bg-gray-50 rounded-r-xl flex items-center justify-center px-4'>
          <div className='flex flex-col space-y-8 w-96'>
            <div>
              <h1 className='text-3xl sm:text-4xl pb-2 font-semibold text-center'>Create your account</h1>
              <div className='flex justify-center space-x-2 items-center'>
                <span className='text-gray-500'>Already have an account?</span>
                <button className='link'
                  onClick={() => navigate('/login')}>Log in</button>
              </div>
            </div>
            <div className='flex flex-col space-y-4'>
              <div>
                <input type="text" className={style.input} name='fullName' id='fullname' placeholder='Full name' onChange={handleRegisterDataChange} />
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
                <input type="date" className={style.input} name='birthday' id='birthdate' onChange={handleRegisterDataChange} />
              </div>
              <div className='py-2'>
                <span className='pl-2 text-gray-500'>Gender</span>
                <div className='flex flex-col xs:flex-row justify-between items-center gap-2 px-2 pt-2'>
                  <label htmlFor="male" className={style.radio}>
                    <span>Male</span>
                    <input type='radio' value='MALE' name='gender' id='male' onChange={handleRegisterDataChange} />
                  </label>
                  <label htmlFor="female" className={style.radio}>
                    <span>Female</span>
                    <input type='radio' value='FEMALE' name='gender' id='female' onChange={handleRegisterDataChange} />
                  </label>
                  <label htmlFor="other" className={style.radio}>
                    <span>Other</span>
                    <input type='radio' value='OTHER' name='gender' id='other' onChange={handleRegisterDataChange} />
                  </label>
                </div>
              </div>
              <div className='flex justify-center'>
                <button className='button-contained-square'
                  onClick={signUp}>Sign up</button>
              </div>
            </div>
            <div className='flex justify-center text-center border-b-2 border-gray-300 relative'>
              <span className='absolute top-[-1rem] text-xl bg-gray-50 text-gray-500 px-2'>or</span>
            </div>
            <button className='button-outlined-square flex items-center justify-center space-x-4'
              onClick={loginWithGoogle}>
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