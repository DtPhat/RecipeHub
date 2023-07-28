import { list } from "postcss";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TrashIcon from "../../assets/TrashIcon";
import useAuth from "../../hooks/useAuth";
import { splitIngredient } from "../../utils/StringUtils"
import EditIngredientName from "./EditIngredientName";
import EditIngredientAmount from "./EditIngredientAmount";
import ConfirmBox from "../../components/ConfirmBox";
const ShoppingList = () => {
  const { auth } = useAuth()
  const [shoppingList, setShoppingList] = useState(JSON.parse(localStorage.getItem(`shoppinglist_${auth.user.userId}`)) || [])
  const [editValue, setEditValue] = useState('')
  const [editingAmount, setEditingAmount] = useState('')
  const [confirmClearAll, setConfirmClearAll] = useState(false)
  console.log(shoppingList);
  return (
    <section className='flex justify-center py-4 mx-8 '>
      <div className='border-gray-400 rounded max-w-5xl w-full space-y-4 bg-container py-4 px-8 min-h-[90vh]'>
        <h1 className="font-semibold text-4xl text-gray-500">Shopping list</h1>
        <p className="text-xl text-gray-500 italic">The items in this list are added from <Link to='/mealplanner' className="link underline underline-offset-4">Meal Planner</Link></p>
        <p className="text-xl text-gray-500 italic">You can edit the amount of ingredients by clicking on it</p>
        <div className="space-y-4">
          {
            shoppingList.map(recipe =>
              <div className="space-y-2">
                <h1 className="text-accent font-semibold px-1">{recipe.title}</h1>
                <ul className="space-y-2 list-disc">
                  {recipe.ingredients.map((ingredient, i) => {
                    const name = ingredient.ingredientName
                    const amount = ingredient.amount
                    const id = ingredient.ingredientId
                    return <li key={i} className={`flex justify-between gap-2`}>
                      <div className={`flex flex-col sm:flex-row flex-1 justify-between px-4 text-xl ${i % 2 === 0 ? 'bg-item' : ''}`}>
                        {/* {id === editingName ?
                    <EditIngredientName editValue={editValue} setEditValue={setEditValue}
                      handleSubmit={() => { ingredient.ingredientName = editValue; localStorage.setItem(`shoppinglist_${auth.user.userId}`, JSON.stringify(shoppingList)); setEditingName('') }} />
                    : <span onClick={() => { setEditingName(id); setEditValue(name) }} className='cursor-text'>{name}</span>} */}
                        <span className='cursor-text'>{name}</span>
                        {id === editingAmount ?
                          <EditIngredientAmount editValue={editValue} setEditValue={setEditValue}
                            handleSubmit={() => { ingredient.amount = editValue.toString(); localStorage.setItem(`shoppinglist_${auth.user.userId}`, JSON.stringify(shoppingList)); setEditingAmount('') }} />
                          : <span onClick={() => { setEditingAmount(id); setEditValue(amount.trim()) }} className='w-16 sm:w-52 text-end cursor-pointer'>{amount}</span>}
                      </div>
                      <button className="p-1 hover:bg-gray rounded text-gray-500 hover:text-inherit " onClick={() => {
                        recipe.ingredients.splice(recipe.ingredients.indexOf(ingredient), 1)
                        const newList = shoppingList.filter(item => item.ingredients.length > 0)
                        localStorage.setItem(`shoppinglist_${auth.user.userId}`, JSON.stringify(newList))
                        setShoppingList(newList)
                      }}>
                        <TrashIcon style='w-5 h-5' />
                      </button>
                    </li>
                  })}
                </ul>
              </div>
            )}
          <div className="flex justify-end pt-2">
            <button className="button-outlined-square color-secondary opacity-50 hover:opacity-90 py-0 px-2 w-24" onClick={() => setConfirmClearAll(true)}>Clear All</button>
          </div>
        </div>
      </div>
      <ConfirmBox open={confirmClearAll} setOpen={setConfirmClearAll} callback={() => {setShoppingList([]); localStorage.setItem(`shoppinglist_${auth.user.userId}`, JSON.stringify([])) }} message='Clear all the items in shopping list?'/>
    </section >
  )
}

export default ShoppingList

