import React, { useState } from 'react';
import axios from 'axios';

const CartListView =   () => {
    const [cartItem ,setCartItem]= useState([]);

    const FetchUserCart = async () => {
        try{
            const body={

            }
            const response = await axios.post('http://localhost:8080/api/login', body);
        }
        catch (error) {
            console.log(error.response);
            setApiError(error);
          }
    }
  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            <div>
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartListView;
