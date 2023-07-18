import React from 'react'

const Layout = ({ children }) => {
  return (
    <section className='flex justify-center lg:py-4 lg:mx-8 gap-6'>
      <div className='max-w-8xl w-full flex flex-col justify-center gap-4 bg-container dark:bg-black rounded  lg:p-8 '>
        {children}
      </div>
    </section>
  )
}

export default Layout