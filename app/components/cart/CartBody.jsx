'use client'
import React, { useState, useEffect, useContext } from 'react'
// import { CounterContext } from '@/app/Context/CounterContext';
import { CounterContext } from '@/app/Context/CounterContext'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProfileDataContext } from '@/app/Context/ProfileContext';
import { toast } from 'sonner';

export default function CartBody() {
    let { cartCont, cartHandling } = useContext(CounterContext);
    let cartContCopy = [...cartCont];
    let [bookmarks, setBookmarks] = useState([]);
    let secBookmark = [...bookmarks];
    let totalPrice = 0;
    let [worningDisplay, setWorningDisplay] = useState(false);
    let { data } = useContext(ProfileDataContext);
    let tax = 1;
    const router = useRouter();
    for (let index = 0; index < cartCont.length; index++) {
        totalPrice += Number(cartCont[index].price) * Number(cartCont[index].Quantity);

    }
    return (
        <div className="cart-body">
            <div className="prods">
                <div className="prods-heading">
                    <h2>Products ( {cartCont.length} )</h2>
                    <button
                        onClick={() => {
                            localStorage.setItem('cart', JSON.stringify([]));
                            cartHandling([]);
                        }}
                    ><i className="fa-regular fa-trash-can"></i> clear all cart</button>
                </div>
                <div className="cart-products">
                    {
                        cartCont.length === 0 ? <p className='empty'>Cart is Empty</p> :
                            cartCont.map((item, index) =>
                                <div className="cart-product" key={index}>
                                    <div className="l-side">
                                        <div className="img-cont">
                                            <Image src={item.image} width={100} height={100} alt='product' className='product-img'></Image>
                                        </div>
                                        <div className="info">
                                            <p className='title'>{item.name}</p>
                                            <p className='categ'>{item.category?.name}</p>
                                            <div className="rate">
                                                <i className={`fa-solid fa-star ${item.rate >= 1 ? "golden" : ""}`}></i>
                                                <i className={`fa-solid fa-star ${item.rate >= 2 ? "golden" : ""}`}></i>
                                                <i className={`fa-solid fa-star ${item.rate >= 3 ? "golden" : ""}`}></i>
                                                <i className={`fa-solid fa-star ${item.rate >= 4 ? "golden" : ""}`}></i>
                                                <i className={`fa-solid fa-star ${item.rate >= 5 ? "golden" : ""}`}></i>
                                            </div>
                                            <p className='price'>{item.price}</p>
                                        </div>
                                    </div>
                                    <div className="r-side">
                                        <i className={`${bookmarks.includes(item.id) ? 'fa-solid colored' : "fa-regular"} fa-bookmark `} onClick={() => {
                                            if (bookmarks.includes(item.id)) {
                                                //handle Add To Favourites 
                                                secBookmark = [...bookmarks];
                                                let index = secBookmark.indexOf(item.id);
                                                secBookmark.splice(index, 1);
                                                setBookmarks(secBookmark);
                                            }
                                            else {
                                                //handle Remove From Favourites 
                                                secBookmark = [...bookmarks];
                                                secBookmark.push(item.id);
                                                setBookmarks(secBookmark);
                                            }
                                        }
                                        }></i>
                                        <div className="count-cont">
                                            <div className="prod-count">
                                                <span className='minus' onClick={() => {
                                                    if (item.Quantity > 1) {
                                                        cartContCopy[index].Quantity = item.Quantity - 1;
                                                        cartHandling(cartContCopy);
                                                    }

                                                }}
                                                >-</span>
                                                <span className='count'>{item.Quantity}</span>
                                                <span className='minus'
                                                    onClick={() => {
                                                        cartContCopy[index].Quantity = item.Quantity + 1;
                                                        cartHandling(cartContCopy);
                                                    }}
                                                >+</span>

                                            </div>
                                            <p className='availability' style={{ display: "none" }}>Only {item.availability_number} available</p>
                                        </div>
                                    </div>
                                </div>
                            )
                    }
                </div>
            </div>
            {

                cartCont.length === 0 ? null :
                    <div className="price-summary">
                        <h2>Price Summary</h2>
                        <div className="price-details">
                            <div className="flex-dit">
                                <div className="head">Total Items</div>
                                <div className="value">{totalPrice} K.D</div>
                            </div>
                            <div className="flex-dit">
                                <div className="head">Total VAT</div>
                                <div className="value">{tax} K.D</div>
                            </div>

                        </div>
                        <div className="total">
                            <div className="head">Total</div>
                            <div className="value">{totalPrice + tax} K.D</div>
                        </div>
                        <button href={cartCont.length > 0 ? '/checkout' : "/cart"} className='addBtn'
                            onClick={() => {
                                if (data?.default_address) {
                                    if (cartCont.length > 0) {
                                        router.push('/checkout')
                                    }
                                    else {
                                        setWorningDisplay(true)
                                        toast.success('Please Add Products To Cart');
                                    }
                                }
                                else {
                                    router.push('/profile/add-address')
                                    toast.warning('Please Add Address');
                                }
                            }}
                        >Checkout</button>
                        <p className='worning' style={{ display: worningDisplay ? 'block' : 'none' }}>Please Add Products To Cart</p>
                    </div>
            }
        </div>
    )
}
