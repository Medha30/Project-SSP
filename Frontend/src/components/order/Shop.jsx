import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../../utils/axios/axiosInstance';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axiosInstance.get('/cart/ravi');
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const incrementQuantity = async (id,quantity) => {
        try {
            await axiosInstance.put(`/cart/${id}/${quantity+1}`);
            fetchCartItems();
        } catch (error) {
            console.error('Error incrementing quantity:', error);
        }
    };

    const decrementQuantity = async (id,quantity) => {
        try {
            await axiosInstance.put(`/cart/${id}/${quantity-1}`);
            fetchCartItems();
        } catch (error) {
            console.error('Error decrementing quantity:', error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axiosInstance.delete(`/cart/${id}`);
            fetchCartItems();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

 

    return (
        <div className="cart">
            <h1>Shopping Cart</h1>
            <div className="cart-items">
                {cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.id}>
                                <h3>{item.product.name}</h3>
                                <p>Price: Rs. {item.product.price}</p>
                                <p>
                                    Quantity:
                                    <button onClick={() => decrementQuantity(item.id,item.quantity)} disabled={item.quantity <= 1}>-</button>
                                    {item.quantity}
                                    <button onClick={() => incrementQuantity(item.id,item.quantity)}>+</button>
                                </p>
                                <button onClick={() => deleteItem(item.product.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {/* <div className="delivery-date">
                <h2>Delivery Date</h2>
                <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => updateDeliveryDate(e.target.value)}
                />
            </div> */}
        </div>
    );
};

export default Cart;
