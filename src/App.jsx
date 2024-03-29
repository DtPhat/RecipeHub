
import React, { useEffect } from "react";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import RequireAuth from "./pages/RequireAuth";
import { Route, Routes } from "react-router-dom";
import UserHeader from "./components/header/UserHeader";
import Home from "./pages/home/index.jsx";
import Login from "./pages/login/index.jsx";
import Register from "./pages/register/index.jsx";
import Recipe from "./pages/recipe/index.jsx";
import useAuth from "./hooks/useAuth.js";
import GlobalRecipes from "./pages/global/index.jsx";
import NotFound from "./pages/NotFound.jsx";
import AddRecipe from "./pages/add/index.jsx";
import FriendRecipe from "./pages/friends/index.jsx";
import RecipeExport from "./pages/export/index.jsx";
import MealPlanner from "./pages/mealplanner/index.jsx";
import ShoppingList from "./pages/shoppinglist/index.jsx";
import Profile from "./pages/profile/index.jsx";
import Settings from "./pages/settings/index.jsx";
import EditRecipe from "./pages/edit/index.jsx";
import UserProfile from "./pages/profile/UserProfile.jsx";
import Feedback from "./pages/feedback/Feedback.jsx";
import GlobalRecipeDetails from "./pages/global/GlobalRecipeDetails.jsx";
import DashBoard from './pages/admin/DashBoard.jsx';
import RecipeMP from './pages/admin/RecipeManagementPage/RecipeMP.jsx';
import FeedbackPage from './pages/admin/FeedbackPage/FeedbackPage.jsx';
import UserMP from './pages/admin/UserManagementPage/UserMP.jsx';
import ReactGA, { pageview } from 'react-ga';
export const TRACKING_ID = 'G-FVY5ZCWNMT'
ReactGA.initialize(TRACKING_ID);


const App = () => {

	const { auth } = useAuth()
	const isAdmin = auth?.user.role === "ADMIN"
	return (
		<main className="app">
			{!isAdmin && <UserHeader />}
			<Routes>
				<Route index element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/global" >
					<Route index element={<GlobalRecipes />} />
					<Route path=":recipeId" element={<GlobalRecipeDetails />} />
				</Route>
				<Route element={<RequireAuth allowedRole='USER' />} >
					<Route path='/recipe' >
						<Route index element={<Recipe />} />
						<Route path='add' element={<AddRecipe />} />
						<Route path='edit' element={<EditRecipe />} />
						<Route path='friends' element={<FriendRecipe />} />
						<Route path='export' element={<RecipeExport />} />
					</Route>
					<Route path='/mealplanner' element={<MealPlanner />} />
					<Route path='/shoppinglist' element={<ShoppingList />} />
					<Route path='/user'>
						<Route path=':userId' element={<UserProfile />} />
						<Route path='profile' element={<Profile />} />
						<Route path='settings' element={<Settings />} />
						<Route path='feedback' element={<Feedback />} />
					</Route>
				</Route>
				<Route element={<RequireAuth allowedRole='ADMIN' />}>
					<Route path='/admin' element={<AdminLayout />}>
						<Route index element={<DashBoard />} />
						<Route path='recipeManagement' element={<RecipeMP />} />
						<Route path='supportTickets' element={<FeedbackPage />} />
						<Route path='userManagement' element={<UserMP />} />
					</Route>
				</Route>
				<Route path="/*" element={<NotFound />} />
			</Routes>
		</main>
	)
};

export default App;