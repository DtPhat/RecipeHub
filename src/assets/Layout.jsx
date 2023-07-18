import React from 'react'

const Layout = ({children}) => {
  return (
    <div className={
      isDarkMode
        ? 'dark relative flex bg-gray-800 overflow-hidden text-whitegray'
        : 'relative flex overflow-hidden'
    }>
      {children}
    </div>
  )
}

export default Layout