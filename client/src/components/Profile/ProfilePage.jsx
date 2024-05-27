import styles from "./ProfilePage.module.css";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import { Card } from 'antd';

export default function ProfilePage() {
    const { user } = useContext(UserContext);
    function capFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  return (
    <>
    <div className={styles.container}>
    {user ? <Card bordered={false} className={styles.orderCard}>
        <h1>Your Profile</h1>
        <h4>Name: {capFirst(user.name)}</h4>
        <h4>Email: {user.email}</h4>
    </Card> : <h1>Please log in to view your profile</h1>}
    </div>

    </>
  );
}