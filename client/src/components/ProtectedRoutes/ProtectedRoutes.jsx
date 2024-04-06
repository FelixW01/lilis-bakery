import { Navigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";

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
  const {isLoggedIn, user} = useContext(UserContext)
  const location = useLocation();
  const token = useToken();

  if (user !== null) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export function SuccessRoute({ children }) {
  const {isLoggedIn} = useContext(UserContext)
  const location = useLocation();
  const token = useToken();

  if (!isLoggedIn && !token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}