import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'


export default function Header({ cart, setCart }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const newCart = [...cart];
    const total = () => {
        let total = 0;
        newCart.forEach(item => {
            total += item.price * item.count;
        })
        return total;
    }

    const handleDecrease = (index) => {
        if (newCart[index].count > 1) {
            newCart[index].count--;
            localStorage.setItem("cart", JSON.stringify(newCart));
            setCart(newCart);
        } else {
            newCart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(newCart));
            setCart(newCart);
        }
    }

    const handleIncrease = (index) => {
        newCart[index].count++;
        localStorage.setItem("cart", JSON.stringify(newCart));
        setCart(newCart);
    }

    const pay = () => {
        alert("Bạn đã thanh toán thành công !")
        setCart([]);
    }
    return (
        <header className="bg-blue-gray-100">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="font-bold fs-3 text-deep-orange-900">SHOPPING CART</span>
                    </a>
                </div>
                <div className="flex relative">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <i className="fa-solid fa-cart-shopping fs-3 text-deep-orange-900"></i>
                    </button>
                    <div className='rounded-full bg-yellow-500 px-1.5 absolute -top-3 -right-2'>{newCart.length}</div>
                </div>
            </nav>
            <Dialog as="div" className="" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto  bg-deep-orange-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="font-bold fs-3 text-gray-100">CART</span>
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <table>
                                    <tbody className='flex-col gap-10'>
                                        {newCart.length > 0 ? (newCart.map((item, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td className='w-5'>{i + 1}</td>
                                                    <td className='w-24'>{item.name}</td>
                                                    <td className='w-28'>{Number(item.price).toLocaleString('vi-VN')} đ</td>
                                                    <td>
                                                        <button
                                                            className='border rounded-md p-1.5 text-white'
                                                            onClick={() => handleDecrease(i)}
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            className='w-8 p-1.5 mx-2  text-white'
                                                            type="number"
                                                            disabled
                                                            value={item.count}
                                                        />
                                                        <button
                                                            className='border rounded-md p-1.5 text-white'
                                                            onClick={() => handleIncrease(i)}
                                                        >
                                                            +
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })) : (<p className='text-white'>Giỏ hàng đang trống !</p>)}
                                    </tbody>
                                </table>
                            </div>
                            <div className="py-6">
                                <button className='btn btn-light mr-5 w-56 text-xl'>{Number(total()).toLocaleString('vi-VN')} đ</button>
                                <button className='btn btn-info w-20' onClick={pay}>PAY</button>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}