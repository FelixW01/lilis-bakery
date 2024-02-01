import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from './components/Header';
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/user';
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
    <Header />
    <Toaster position="top-center" toastOptions={{duration: 2000}}/>
      <Outlet/>
      <Footer />
    </>
  )
}

export default App
