import React, { useEffect, useRef, useState } from 'react'

const useOuterClick = ({isVisible}) => {
  const [open, setOpen] = useState(isVisible);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return { ref, open, setOpen };
}

export default useOuterClick