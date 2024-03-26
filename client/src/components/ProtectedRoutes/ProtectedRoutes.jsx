import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
  

 export function ProtectedRoute({ children }) {
  const {isLoggedIn} = useContext(UserContext)
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!isLoggedIn && !token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

 export function ProtectedRoute2({ children }) {
  const {isLoggedIn} = useContext(UserContext)
  const location = useLocation();
  if (isLoggedIn && token) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
}

