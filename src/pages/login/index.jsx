import { useGoogleLogin } from '@react-oauth/google'
import React, { useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import EyeIcon from '../../assets/EyeIcon'
import useAuth from '../../hooks/useAuth'
import ForgottenPassword from './ForgottenPassword'
import { Spinner } from 'flowbite-react'

const Login = () => {
  const [showingPassword, setShowingPassword] = useState(false)
  const [loginData, setLoginData] = useState({ email: '', password: '', isRememberMe: false })
  const { auth, setAuth } = useAuth()
  const location = useLocation()
  const fromPath = location.state?.from?.pathname || '/'
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')
  const [openForgottenPasswordBox, setOpenForgottenPasswordBox] = useState(false)
console.log(loginData);
  const handleLoginDataChange = (e) => {
    const { name, value, type } = e.target
    setLoginData(prevData => { return { ...prevData, [name]: type == 'checkbox' ? !prevData[name] : value } })
  }

  const loginWithAccount = () => {
    setSubmitting(true)
    axios.post('/api/v1/auth/basic/login', loginData)
      .then(response => {
        setAuth(response.data);
        response?.data?.user?.role === "ADMIN" ? navigate('/admin') : navigate(fromPath)
      }).catch(error => {
        console.log(error)
        error.request.status == 403 && setServerError('Wrong email or password')
      }).finally(() => setSubmitting(false))
  }
  const loginWithGoogle = useGoogleLogin({
    onSuccess: tokenResponse => axios
      .post(`/api/v1/auth/google/oauth/login/${tokenResponse.access_token}`)
      .then(response => { setAuth(response.data); response?.data?.user?.role === "ADMIN" ? navigate('/admin') : navigate(fromPath) }),
    onError: (error) => console.log("Login google fail", error)
  });

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])


  return (
    <section className='flex justify-center mx-8 items-center'>
      <div className='max-w-8xl w-full flex h-[56rem] py-8 relative'>
        {/* <img src="/img/logo-text-bottom.png" alt="" className='absolute top-12 left-4 w-20 h-24 select-none' /> */}
        <div className='w-full bg-gray-50 rounded-l-xl flex items-center justify-center px-4'>
          <div className='flex flex-col space-y-8 w-96'>
            <div>
              <h1 className='text-4xl pb-2 font-semibold'>Welcome back</h1>
              <span className='text-gray-500'>Please enter your details</span>
            </div>
            <div className='flex flex-col space-y-4'>
              <div>
                <input type="text" className='pb-2 pt-4 text-lg px-2 bg-gray-50 border-b-2 focus:outline-gray-200 w-full' name='email' id='email' placeholder='Email'
                  onChange={handleLoginDataChange} />
                <span className='invisible text-sm'>Warning here</span>
              </div>
              <div className='relative'>
                <input type={showingPassword ? 'text' : 'password'} className='pb-2 pt-4 text-lg px-2 bg-gray-50 border-b-2 focus:outline-gray-200 w-full pr-12' name='password' id='password' placeholder='Password'
                  onChange={handleLoginDataChange} />
                {loginData.password && <button className='absolute top-4 right-3 text-gray-400 hover:text-gray-800 bg-gray-50 z-10'
                  onClick={() => setShowingPassword(prevState => !prevState)}>
                  <EyeIcon style='w-6 h-6' isOn={showingPassword} />
                </button>}
                <span className='invisible text-sm'>Warning here</span>
              </div>
              <div className='flex justify-between'>
                <div className='space-x-2 flex items-center text-gray-600 select-none'>
                  <input type="checkbox" name='isRememberMe' id='isRememberMe' className='w-5 h-5 accent-gray-300' checked={loginData.isRememberMe} onChange={handleLoginDataChange} />
                  <label htmlFor='isRememberMe'>Remmeber me</label>
                </div>
                <div className='text-green-accent cursor-pointer flex justify-center px-2' onClick={() => setOpenForgottenPasswordBox(true)}>
                  <span className='underline'>Forgotten password?</span>
                </div>
                <ForgottenPassword openForgottenPasswordBox={openForgottenPasswordBox} setOpenForgottenPasswordBox={setOpenForgottenPasswordBox} />
              </div>
              <span className='text-red-500 font-semibold m-auto'>{serverError}</span>
              <div className='flex justify-center'>
                <button className='button-contained-square'
                  onClick={loginWithAccount}>
                  {submitting ?
                    <Spinner color='success' />
                    : <span>Log in</span>}
                </button>
              </div>
            </div>

            <div className='flex justify-center text-center border-b-2 border-gray-300 relative'>
              <span className='absolute top-[-1rem] text-xl bg-gray-50 text-gray-500 px-2'>or</span>
            </div>
            <button className='button-outlined-square space-x-4'
              onClick={loginWithGoogle}>
              <img src="/img/googleIcon.png" alt="google icon" className='w-6 h-6' />
              <span className='font-semibold'>Continue with google</span>
            </button>
            <div className='flex justify-center space-x-2 items-center'>
              <span>Don't have an account?</span>
              <button className='link'
                onClick={() => navigate('/register')}>Sign up for free</button>
            </div>
          </div>
        </div>
        <div className='w-1/2 hidden md:block bg-green-variant rounded-r-xl pt-16 relative px-4'>
          <div className='flex justify-center 2xl:pr-24'><img src="/img/rotating-dish.png" alt="" className='animate-spin-slow w-[32rem]' /></div>
          <h1 className='text-9xl text-green-200 drop-shadow-xl rotate-90 absolute top-64 left-[26rem] hidden 2xl:flex'>Organize,</h1>
          <div className='flex gap-2 p-4'>
            <h1 className='text-9xl text-green-200 flex-wrap drop-shadow-xl hidden 2xl:flex'>Plan,</h1>
            <h1 className='text-9xl text-green-100 flex-wrap drop-shadow-xl pt-4 hidden 2xl:flex'>Simplify</h1>
          </div>
          <h1 className='text-7xl text-green-200 flex flex-wrap drop-shadow-xl px-4 text-center leading-[5rem] 2xl:hidden'>Organize, Plan, Simplify</h1>
        </div>
      </div>
    </section>
  )
}

export default Login