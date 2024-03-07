import styles from "./SuccessPage.module.css";
import React, { useEffect } from 'react';
import axios from 'axios';


export default function SuccessPage() {

useEffect(() => {
    // Make a GET request to the "/success" endpoint
    axios.get('/checkout/success')
      .then(response => {
        // Handle the success response
        console.log('Successfully reached the /success endpoint', response.data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error reaching the /success endpoint', error);
      });
  }, []); 

  return (
    <>
    <div className={styles.container}>
      <div>
        <h2>Payment Successful!</h2>
      </div>
    </div>
    </>
  );
}