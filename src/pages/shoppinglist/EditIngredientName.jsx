import React, { useEffect, useRef } from 'react';
const EditIngredientName = ({ editValue, setEditValue, handleSubmit }) => {
  const inputRef = useRef()
  useEffect(() => {
    inputRef.current.focus()
  }, [editValue]);
  return (
    <input className="bg-inherit text-inherit w-16 sm:w-52  px-2 "
      onBlur={handleSubmit}
      onKeyDown={(e) => { e.key === 'Enter' && handleSubmit() }}
      value={editValue} ref={inputRef}
      onChange={(e) => { setEditValue(e.target.value) }}
    />
  )
}

export default EditIngredientName