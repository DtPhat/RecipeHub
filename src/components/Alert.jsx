import React, { useEffect, useState } from 'react'
const Alert = ({ message , display}) => {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false)
    }, 3000)

    return () => {
      clearTimeout(timeId)
    }
  }, [show]);

  if (!show) {

  }

  return (
    <>
      {
        show &&
        <div className={`absolute z-50 flex border`}>
          <div className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-green-variant text-inherit text-2xl font-extrabold">!</div>
          <div className="mx-3 text-sm font-semibold">{message}</div>
        </div>
      }
    </>
  )
}

export default Alert