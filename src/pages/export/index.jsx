import React, { useEffect } from 'react'
import axios from '../../api/axios'
import usePrivateAxios from '../../hooks/usePrivateAxios'

const RecipeExport = () => {
  const privateAxios = usePrivateAxios()
  const ids = [104, 114]
  useEffect(() => {
    // privateAxios.post('/api/v1/user/file/recipe/excel',ids,{
    //   responseType: 'blob', // important
    // }).then(response => {
    //   const href = URL.createObjectURL(response.data);

    //   // create "a" HTML element with href to file & click
    //   const link = document.createElement('a');
    //   link.href = href;
    //   link.setAttribute('download', 'recipe.xlsx'); //or any other extension
    //   document.body.appendChild(link);
    //   link.click();
  
    //   // clean up "a" element & remove ObjectURL
    //   document.body.removeChild(link);
    //   URL.revokeObjectURL(href);
    // })
  }, []);
  return (
    <div>Export recipe</div>
  )
}

export default RecipeExport