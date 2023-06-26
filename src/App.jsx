import React from "react";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import RequireAuth from "./pages/RequireAuth";
import { Route, Routes } from "react-router-dom";
import UserHeader from "./components/header/UserHeader";
import Home from "./pages/home/index.jsx";
import Login from "./pages/login/index.jsx";
import Register from "./pages/register/index.jsx";
import Recipe from "./pages/recipe/index.jsx";
import useAuth from "./hooks/useAuth.js";
import GlobalRecipe from "./pages/global/index.jsx";
import NotFound from "./pages/NotFound.jsx";
import AddRecipe from "./pages/add/index.jsx";
import FriendRecipe from "./pages/friends/index.jsx";
import RecipeExport from "./pages/export/index.jsx";
import MealPlanner from "./pages/mealplanner/index.jsx";
import ShoppingList from "./pages/shoppinglist/index.jsx";
import Profile from "./pages/profile/index.jsx";
import Settings from "./pages/settings/index.jsx";
import EditProfile from "./pages/profile/EditProfile.jsx";

const App = () => {
  const { auth } = useAuth()
  const isAdmin = auth?.user.role === "ADMIN"
  return (
    <main>
      {isAdmin ? <AdminHeader /> : <UserHeader />}
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/global" element={<GlobalRecipe />} />
        <Route element={<RequireAuth />} >
          <Route path='/recipe' >
            <Route index element={<Recipe />} />
            <Route path='add' element={<AddRecipe />} />
            <Route path='friend' element={<FriendRecipe />} />
            <Route path='export' element={<RecipeExport />} />
          </Route>
          <Route path='/mealplanner' element={<MealPlanner />} />
          <Route path='/shoppinglist' element={<ShoppingList />} />
          <Route path='/user'>
            <Route path=':username' element={<Profile />} />
            <Route path='profile' element={<Profile />} />
            <Route path='profile/edit' element={<EditProfile />} />
            <Route path='settings' element={<Settings />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  )
};

export default App;
