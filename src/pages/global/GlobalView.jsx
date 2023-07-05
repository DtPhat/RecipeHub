import React, { useState } from 'react'
import ClockIcon from '../../assets/ClockIcon'
import KnifeForkIcon from '../../assets/KnifeForkIcon'
import LeafIcon from '../../assets/LeafIcon'
import useOuterClick from '../../hooks/useOuterClick'
import { msToTime } from '../../utils/TimeUtil'
import GlobalRecipe from '../../components/GlobalRecipe'
import GlobalRecipeItem from './GlobalRecipeItem'

const GlobalView = ({ recipeData }) => {
  const { ref, open, setOpen } = useOuterClick(false)
  const [chosenRecipe, setChosenRecipe] = useState()
  return (
    <div className='py-2 grid xs:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5'>
      {recipeData.map(recipe => <GlobalRecipeItem recipeItem={recipe} setChosenRecipe={setChosenRecipe} setOpen={setOpen} />)}
      {open && <GlobalRecipe innerRef={ref} recipe={chosenRecipe} setOpen={setOpen} />}
    </div>
  )
}

export default GlobalView