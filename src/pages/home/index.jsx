import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Features from './Features'
import HomeFooter from './HomeFooter'
const Home = () => {
  const navigate = useNavigate()
  return (
    <section>
      <div className='text-green-50 bg-homepage h-[45rem] bg-cover bg-no-repeat flex flex-col items-center justify-center space-y-14'>
        <h1 className='text-5xl font-bold text-center w-4/5'>Organize your favorite recipes online</h1>
        <span className='text-2xl font-semibold flex w-2/5 text-center leading-relaxed'>Build your private cookbook by gathering recipes, making meal plan and creating shopping list for your meal.</span>
        <button className='text-xl font-bold px-16 py-2 bg-green-accent rounded text-green-100 border-2 border-green-variant hover:border-green-200 hover:text-whitegray'
          onClick={() => navigate('/recipe', { replace: true })}>
          Get it for free
        </button>
      </div>
      <Features />
      <HomeFooter />
    </section>
  )
}

export default Home