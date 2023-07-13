import React from 'react'
import { Toast as FlowbiteToast } from 'flowbite-react'
const Toast = ({ message, direction }) => {
  return (
    <div className={`fixed z-50 bottom-8 ${direction === 'right'? 'right-12' : 'left-4'} `}>
      <FlowbiteToast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-variant text-white text-2xl font-extrabold">!</div>
        <div className="mx-3 text-sm font-semibold">
          {message}
        </div>
        <FlowbiteToast.Toggle />
      </FlowbiteToast>
    </div>
  )
}

export default Toast