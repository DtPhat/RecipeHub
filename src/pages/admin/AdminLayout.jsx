import React from "react";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./DashBoard";
import RecipeMP from "./RecipeManagementPage/RecipeMP";
import FeedbackPage from "./FeedbackPage/FeedbackPage";
import UserMP from "./UserManagementPage/UserMP";
import SideNav from "../../components/NavBar/SideNav";
import TopNav from "../../components/NavBar/TopNav";
import { useThemeContext } from "../../contexts/ThemeContext";
import RequireAuth from "../RequireAuth";

function AdminLayout() {
  const { activeMenu, isDarkMode } = useThemeContext();
  return (
    <main
      className={
        isDarkMode ? "dark relative flex bg-slate-700" : "relative flex"
      }
    >
      <div
        className={
          activeMenu
            ? "sidebar fixed h-screen w-72 bg-white dark:bg-slate-700 "
            : "sidebar w-0 "
        }
      >
        <SideNav />
      </div>
      <div
        className={
          activeMenu
            ? "inline-block min-h-screen w-full dark:bg-slate-700 md:ml-72"
            : "inline-block min-h-screen w-full dark:bg-slate-700"
        }
      >
        <div>
          <TopNav />
        </div>
        <div>
          <Routes>
            <Route path='admin' element={<DashBoard />} />
              <Route path='RecipeManagement' element={<RecipeMP />} />
              <Route path='Feedback' element={<FeedbackPage />} />
              <Route path='UserManagement' element={<UserMP />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default AdminLayout;
