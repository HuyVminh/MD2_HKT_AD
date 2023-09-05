import React, { useState } from 'react'

export default function Index() {
    const list = [
        {
            id: 1,
            name: "Cơm gà",
            price: "120000",
            count: 0,
        },
        {
            id: 2,
            name: "Gà rán",
            price: "150000",
            count: 0,
        },
        {
            id: 3,
            name: "Salad cá hồi",
            price: "200000",
            count: 0,
        },
        {
            id: 4,
            name: "Xôi vịt",
            price: "80000",
            count: 0,
        },
        {
            id: 5,
            name: "Súp bí ngô",
            price: "150000",
            count: 0,
        },
        {
            id: 6,
            name: "Sashimi cá ngừ",
            price: "550000",
            count: 0,
        },
        {
            id: 7,
            name: "Cơm chay",
            price: "150000",
            count: 0,
        },
        {
            id: 8,
            name: "Khoai tây chiên",
            price: "60000",
            count: 0,
        },
        {
            id: 9,
            name: "Nem chua rán",
            price: "90000",
            count: 0,
        },
    ];

    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem("cart")) || [];
    })
    const [open, setOpen] = useState(false);

    const handleAddToCart = (i) => {
        const newCart = [...cart];
        const index = newCart.findIndex(item => item.id === list[i].id);
        if (index == -1) {
            list[i].count = 1;
            newCart.push(list[i]);
            localStorage.setItem("cart", JSON.stringify(newCart));
            setCart(newCart);
        } else {
            newCart[index] = {
                ...newCart[index],
                count: newCart[index].count + 1
            }
            localStorage.setItem("cart", JSON.stringify(newCart));
            setCart(newCart);
        }
    }

    const handleTotal = cart.reduce((acc, item) => {
        return acc + item.price * item.count;
    }, 0)

    const handleIncrease = (i) => {
        const newCart = [...cart]
        newCart[i].count = newCart[i].count + 1;
        localStorage.setItem("cart", JSON.stringify(newCart));
        setCart(newCart);
    }

    const handleDecrease = (i) => {
        const newCart = [...cart]
        if (newCart[i].count > 1) {
            newCart[i].count = newCart[i].count - 1;
            localStorage.setItem("cart", JSON.stringify(newCart));
            setCart(newCart);
        } else {
            newCart.splice(i, 1);
            localStorage.setItem("cart", JSON.stringify(newCart));
            setCart(newCart);
        }
    }


    return (
        <div className='flex'>
            <div className={`bg-yellow-700 pt-8 ${open ? "w-4/5" : "hidden"} displa duration-300 text-white`}>

                <div className='text-center'>
                    <h1>CART</h1>
                    <div>
                        <table className="text-center m-3 mt-5">
                            <tbody>
                                {
                                    cart.map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className='w-5 pb-5'>{i + 1}</td>
                                                <td className='w-32 pb-5'>{item.name}</td>
                                                <td className='w-32 pb-5'>{Number(item.price).toLocaleString('vi-VN')} đ</td>
                                                <td className='pb-5'>
                                                    <button className='border rounded-sm px-2' onClick={() => handleDecrease(i)}>-</button>
                                                    <input type="number" value={item.count} disabled className=' w-7 pl-2 mx-2 text-yellow' />
                                                    <button className='border rounded-sm px-2' onClick={() => handleIncrease(i)}>+</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <div className='total'>
                            <button className='btn btn-success mr-5'>
                                {Number(handleTotal).toLocaleString('vi-VN')} đ
                            </button>
                            <button onClick={() => { setOpen(!open) }} className='btn btn-secondary'>Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='p-7'>
                <div className='text-2xl font-bold'>
                    <div className='mb-5 pl-20 flex align-align-items-center'>
                        <div className='relative'>
                            <i className="fa-solid fa-cart-shopping text-2xl border p-3 z-10 bg-orange-800 rounded-full relative cursor-pointer text-white" onClick={() => setOpen(!open)}></i>
                            <span className='rounded-full bg-orange-300 p-2 text-xs absolute -top-1 -left-3 z-50'>{cart.length}</span>
                        </div>
                        <h2 className='p-3'>SHOP</h2>
                    </div>
                    <div className='flex gap-16 flex-wrap justify-center'>
                        {
                            list.map((item, i) => {
                                return (
                                    <div className="card" style={{ width: "18rem" }} key={i}>
                                        <img src="https://meizanclv.com.vn/wp-content/uploads/2021/12/freepik_8927892-scaled.jpg" className="card-img-top" alt="..." />
                                        <div className="card-body text-center">
                                            <h5 className="card-title">{item.name}</h5>
                                            <p className="card-text pb-2 font-light">{Number(item.price).toLocaleString('vi-VN')} đ</p>
                                            <a href="#" className="btn btn-primary" onClick={() => handleAddToCart(i)}>
                                                Add to Cart
                                            </a>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
