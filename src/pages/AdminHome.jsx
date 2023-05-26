import React from "react";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./DashBoard";
import RecipeMP from "./RecipeManagementPage/RecipeMP";
import FeedbackPage from "./FeedbackPage/FeedbackPage";
import UserMP from "./UserManagementPage/UserMP";
import SideNav from "../components/NavBar/SideNav";
import TopNav from "../components/NavBar/TopNav";
import { usePageContext } from "../contexts/PageContext";

function AdminHome() {
  const { activeMenu, isDarkMode } = usePageContext();
  return (
    <div
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
            <Route path='/' element={<DashBoard />} />
            <Route path='/RecipeManagement' element={<RecipeMP />} />
            <Route path='/Feedback' element={<FeedbackPage />} />
            <Route path='/UserManagement' element={<UserMP />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
