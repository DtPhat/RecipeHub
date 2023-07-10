import React from 'react'

const Skeleton = () => {
  return (
    <div className="w-full max-w-8xl p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
      {Array.apply(null, Array(5)).map((item, i) =>
        <div className="flex items-center justify-between py-4" key={i}>
          <div className='w-full'>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 max-w-7xl w-full mb-2.5"></div>
            <div className="max-w-6xl w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
        </div>)
      }
      <span className="sr-only">Loading...</span>
    </div >
  )
}

export default Skeleton