import React, { useState } from 'react'
import RecipeModal from '../../components/RecipeModal'
import GlobalRecipeItem from './GlobalRecipeItem'

const GlobalView = ({ recipeData }) => {
  const [chosenRecipe, setChosenRecipe] = useState()
  return (
    <div className='py-2 grid xs:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5'>
      {recipeData.map(recipe => <GlobalRecipeItem key={recipe.recipe_id} recipeItem={recipe} setChosenRecipe={setChosenRecipe} />)}
      <RecipeModal chosenRecipe={chosenRecipe} setChosenRecipe={setChosenRecipe} global={true}/>
    </div>
  )
}

export default GlobalView