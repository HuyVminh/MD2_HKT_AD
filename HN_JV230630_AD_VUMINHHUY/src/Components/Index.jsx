import React, { useState } from 'react';
import Header from './Header';
import { ListProduct } from './ListProduct';

export default function Index() {
    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    });
    const list = [
        {
            id: 1,
            name: "Product 1",
            price: 1000000,
            count: 0,
        },
        {
            id: 2,
            name: "Product 2",
            price: 2000000,
            count: 0,
        },
        {
            id: 3,
            name: "Product 3",
            price: 3000000,
            count: 0,
        },
        {
            id: 4,
            name: "Product 4",
            price: 4000000,
            count: 0,
        },
        {
            id: 5,
            name: "Product 5",
            price: 5000000,
            count: 0,
        },
        {
            id: 6,
            name: "Product 6",
            price: 6000000,
            count: 0,
        },
    ];
    return (
        <>
            <Header cart={cart} setCart={setCart} />
            <ListProduct list={list} cart={cart} setCart={setCart} />
        </>
    )
}
