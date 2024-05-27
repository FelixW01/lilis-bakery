import styles from "./ProfilePage.module.css";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";

export default function ProfilePage() {
    const { user } = useContext(UserContext);
    function capFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  
  return (
    <>
    <div className={styles.container}>
      <div>
        <h1>Your Profile</h1>
        <h3>Name: {capFirst(user.name)}</h3>
        <h3>Email: {user.email}</h3>
      </div>
    </div>
    </>
  );
}