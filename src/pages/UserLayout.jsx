import React from 'react'
import { Route, Routes } from "react-router-dom";
import UserHeader from "../components/header/UserHeader";
import Home from "./home";
import Recipe from "./recipe";
import MealPlanner from "./mealplanner";
import ShoppingList from "./shoppinglist";
import AddRecipe from "./add";
import FriendRecipe from "./friends";
import GlobalRecipe from "./global";
import RecipeExport from "./export";
import Login from "./login";
import Register from './register';
import RequireAuth from './RequireAuth';
const UserLayout = () => {
  return (
    <Routes>
      <Route path='/recipe' >
        <Route index element={<Recipe />} />
        <Route path='add' element={<AddRecipe />} />
        <Route path='friend' element={<FriendRecipe />} />
        <Route path='global' element={<GlobalRecipe />} />
        <Route path='export' element={<RecipeExport />} />
      </Route>
      <Route path='/mealplanner' element={<MealPlanner />} />
      <Route path='/shoppinglist' element={<ShoppingList />} />
    </Routes>
  )
}

export default UserLayout