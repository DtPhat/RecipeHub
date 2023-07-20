import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TrashIcon from "../../assets/TrashIcon";
import useAuth from "../../hooks/useAuth";
import { splitIngredient } from "../../utils/StringUtils"
const ShoppingList = () => {
  const { auth } = useAuth()
  const [shoppingList, setShoppingList] = useState(JSON.parse(localStorage.getItem(`shoppinglist_${auth.user.userId}`)) || [])
  const [editingName, setEditingName] = useState('')
  const [editingAmount, setEditingAmount] = useState('')
  return (
    <section className='flex justify-center py-4 mx-8 '>
      <div className='border-gray-400 rounded max-w-7xl w-full space-y-4 bg-container py-4 px-8 min-h-[90vh]'>
        <h1 className="font-semibold text-4xl text-gray-500">Shopping list</h1>
        <div className="text-xl text-gray-500 italic">The items in this list are added from <Link to='/mealplanner' className="link underline underline-offset-4">Meal Planner</Link>
        </div>
        <ul className="ml-4 ">
          <li className="flex justify-between text-2xl pb-2 font-semibold">
            <span>Name</span>
            <span className="pr-10">Amount</span>
          </li>
          {
            shoppingList.map((ingredient, i) => {
              const { name, quantity, metric } = splitIngredient(ingredient)
              const id = ingredient.ingredientId
              return <li key={id} className={`flex justify-between gap-2`}>
                <div className={`flex flex-1 justify-between px-4 text-xl cursor-pointer ${i % 2 === 0 ? 'bg-gray' : ''}`}>
                  <span>{name}</span>
                  <span>{quantity || ''} {metric}</span>
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

