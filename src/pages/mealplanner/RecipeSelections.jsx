import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import usePrivateAxios from '../../hooks/usePrivateAxios'
import { initialFilter } from '../recipe'
const RecipeSelections = ({ innerRef }) => {
  // const { recipe_id, images, title, tags, rating, pre_time, cook_time, recipe_yield, ingredients, is_favourite, unit, description, steps, nutrition, privacyStatus } = recipe
  // const [customeYield, setCustomYield] = useState(recipe_yield)
  // const [completedSteps, setCompletedSteps] = useState([])
  const [recipes, setRecipes] = useState()
  const navigate = useNavigate()
  const style = {
    heading: 'text-2xl font-bold underline underline-offset-4 pb-4'
  }
  const privateAxios = usePrivateAxios()
  useEffect(() => {
    privateAxios.post(`/api/v1/user/recipes/filter?page=${0}&size=${10}`, {
      tags: initialFilter.tags,
      ingredients: initialFilter.ingredients,
      favorite: initialFilter.isFavourite,
      sortBy: initialFilter.sortingBy,
      direction: initialFilter.isAscending ? 'asc' : 'desc',
      title: initialFilter.title,
      privacyStatus: null
    })
      .then((response) => { setRecipes(response.data) })
      .catch((error) => console.log(error))
  }, []);
  console.log(recipes);
  return (
    <section
      className='fixed top-0 mt-20 p-4 left-1/2 translate-x-[-50%] max-w-7xl w-full h-[52rem] z-30 border-2 border-gray-300 rounded bg-gray-50 flex flex-col gap-8 overflow-scroll transition ease-in-out'
      ref={innerRef}>

    </section >
  )
}

export default RecipeSelections