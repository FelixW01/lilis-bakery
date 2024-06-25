import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,} from 'react-router-dom'

import App from "./App";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import ResetPassword from "./pages/ResetPassword";
import Contact from "./pages/Contact";
import { ThemeProvider } from "../context/themeContext";

import {ProtectedRoute, ProtectedRoute2 } from "./components/ProtectedRoutes/ProtectedRoutes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route 
        path="login" 
        element={ 
          <ProtectedRoute2>
            <Login />
          </ProtectedRoute2>
      } 
      />
      <Route 
        path="register" 
        element={
            <Register />
      } 
      />
      <Route 
        path="cart" 
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
      } 
      />
      <Route 
        path="Orders" 
        element={ 
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
      } 
      />
      <Route 
        path="Profile" 
        element={ 
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
      } 
      />
      <Route 
        path="Success" 
        element={ 
          <ProtectedRoute>
            <Success />
          </ProtectedRoute>
      } 
      />
      <Route 
        path="Cancel" 
        element={ 
          <ProtectedRoute>
            <Cancel />
          </ProtectedRoute>
      } 
      />

      <Route 
        path="reset-password" 
        element={ 
            <ResetPassword />
      } 
      />

      <Route 
        path="Contact" 
        element={ 
            <Contact />
      } 
      />
      
    </Route>
    
    
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
  </React.StrictMode>
)
