import React from "react";
import { Outlet } from "react-router-dom";
import "./app.css";
import Header from './components/Header/';
import Footer from './components/Footer/'
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { UserContextProvider } from "../context/userContext";

axios.defaults.baseURL = 'https://lilisbakery-81b213953aed.herokuapp.com/api';
// 'http://localhost:3000/api' || 
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
    <Header />
    <Toaster position="bottom-center" toastOptions={{duration: 2000}}/>
      <Outlet/>
      <Footer />
    </UserContextProvider>
  )
}

export default App
