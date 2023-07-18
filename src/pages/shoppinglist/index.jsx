import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const ShoppingList = () => {
  const { auth } = useAuth()
  const [shoppingList, setShoppingList] = useState(JSON.parse(localStorage.getItem(`shoppinglist_${auth.user.userId}`)) || [])
  return (
    <section className='flex justify-center py-4 mx-8 '>
      <div className='border-gray-400 rounded max-w-7xl w-full space-y-4 bg-container py-4 px-8'>
        <h1 className="font-semibold text-4xl text-gray-500">Shopping list</h1>
        <ul className="list-disc">
          {
            shoppingList.map((ingredient, i) =>
              <li key={i} className='cursor-pointer font-semibold ml-8 hover:line-through text-xl'
                onClick={() => {
                  const ingredientList = [...shoppingList]
                  ingredientList.splice(ingredientList.indexOf(ingredient), 1)
                  localStorage.setItem(`shoppinglist_${auth.user.userId}`, JSON.stringify(ingredientList))
                  setShoppingList(ingredientList)
                }} >
                <span>
                  {ingredient.amount} {ingredient.name}
                </span>
              </li>
            )
          }
        </ul>
      </div>

    </section >
  )
}

export default ShoppingList

