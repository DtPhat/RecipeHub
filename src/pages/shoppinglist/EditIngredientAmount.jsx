import React, { useEffect, useRef } from 'react';
const EditIngredientAmount = ({ editValue, setEditValue, handleSubmit }) => {
  const inputRef = useRef()
  useEffect(() => {
    inputRef.current.focus()
  }, [editValue]);
  return (
    <input className="bg-inherit text-inherit text-end px-2 w-12 sm:w-36 relative"
      onBlur={handleSubmit}
      onKeyDown={(e) => { e.key === 'Enter' && handleSubmit() }}
      value={editValue} ref={inputRef}
      onChange={(e) => { setEditValue(e.target.value) }}
    />
  )
}

export default EditIngredientAmount