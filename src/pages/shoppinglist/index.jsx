import { list } from "postcss";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TrashIcon from "../../assets/TrashIcon";
import useAuth from "../../hooks/useAuth";
import { splitIngredient } from "../../utils/StringUtils"
import EditIngredientName from "./EditIngredientName";
import EditIngredientAmount from "./EditIngredientAmount";
const ShoppingList = () => {
  const { auth } = useAuth()
  const [shoppingList, setShoppingList] = useState(JSON.parse(localStorage.getItem(`shoppinglist_${auth.user.userId}`)) || [])
  const [editingName, setEditingName] = useState('')
  const [editValue, setEditValue] = useState('')
  const [editingAmount, setEditingAmount] = useState('')

  return (
    <section className='flex justify-center py-4 mx-8 '>
      <div className='border-gray-400 rounded max-w-5xl w-full space-y-4 bg-container py-4 px-8 min-h-[90vh]'>
        <h1 className="font-semibold text-4xl text-gray-500">Shopping list</h1>
        <p className="text-xl text-gray-500 italic">The items in this list are added from <Link to='/mealplanner' className="link underline underline-offset-4">Meal Planner</Link></p>
        <p className="text-xl text-gray-500 italic">Click on Name or Amount to edit</p>
        <ul className="ml-4 space-y-2">
          <li className="hidden sm:flex justify-between text-2xl pb-1 font-semibold">
            <span>Name</span>
            <span className="pr-10">Amount</span>
          </li>
          {
            shoppingList.map((ingredient, i) => {
              const name = ingredient.ingredientName
              const amount = ingredient.amount
              const id = ingredient.ingredientId
              return <li key={i} className={`flex justify-between gap-2`}>
                <div className={`flex flex-col sm:flex-row flex-1 justify-between px-4 text-xl ${i % 2 === 0 ? 'bg-item' : ''}`}>
                  {id === editingName ?
                    <EditIngredientName editValue={editValue} setEditValue={setEditValue}
                      handleSubmit={() => { ingredient.ingredientName = editValue; localStorage.setItem(`shoppinglist_${auth.user.userId}`, JSON.stringify(shoppingList)); setEditingName('') }} />
                    : <span onClick={() => { setEditingName(id); setEditValue(name) }} className='cursor-text'>{name}</span>}
                  {id === editingAmount ?
                    <EditIngredientAmount editValue={editValue} setEditValue={setEditValue}
                      handleSubmit={() => { ingredient.amount = editValue.toString(); localStorage.setItem(`shoppinglist_${auth.user.userId}`, JSON.stringify(shoppingList)); setEditingAmount('') }} />
                    : <span onClick={() => { setEditingAmount(id); setEditValue(amount) }}>{amount}</span>}
                </div>
                <button className="p-1 hover:bg-gray rounded text-gray-500 hover:text-inherit " onClick={() => {
                  const ingredientList = [...shoppingList]
                  ingredientList.splice(ingredientList.indexOf(ingredient), 1)
                  localStorage.setItem(`shoppinglist_${auth.user.userId}`, JSON.stringify(ingredientList))
                  setShoppingList(ingredientList)
                }}>
                  <TrashIcon style='w-5 h-5' />
                </button>
              </li>
            })
          }
        </ul>
      </div>
    </section >
  )
}

export default ShoppingList

