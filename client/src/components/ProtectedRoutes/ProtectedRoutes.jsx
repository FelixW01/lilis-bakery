import { Navigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/userContext";

function useToken() {
 const [token, setToken] = useState(localStorage.getItem('token'));
 const {isLoggedIn} = useContext(UserContext)

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    setToken(tokenFromStorage);
  }, [isLoggedIn]); // Runs once on component mount

  return token;
}

export function ProtectedRoute({ children }) {
  const {isLoggedIn} = useContext(UserContext)
  const location = useLocation();
  const token = useToken();
  
  // If the user is not logged in and there is no token in local storage, redirect them to the login page
  if (!isLoggedIn && !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

// If the user is logged in, redirect them to the home page
 export function ProtectedRoute2({ children }) {
  const {user} = useContext(UserContext)
  const location = useLocation();
  const token = useToken();

  if (user !== null) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

// export function SuccessRoute({ children }) {
//   const {isLoggedIn} = useContext(UserContext)
//   const location = useLocation();
//   const token = useToken();

//   if (!isLoggedIn && !token) {
//     return <Navigate to="/" state={{ from: location }} replace />;
//   }

//   return children;
// }