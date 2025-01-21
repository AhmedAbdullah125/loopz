'use client'
import React, { useState, useEffect, useContext } from 'react'
import { CounterContext } from '@/app/Context/CounterContext'
import Image from 'next/image';
import Link from 'next/link';
import addressImage from '../../assets/checkout/address.svg'
import taa from '../../assets/checkout/taa.svg'
import wallet from '../../assets/checkout/wallet.png'
import { ProfileDataContext } from '@/app/Context/ProfileContext';

export default function CartBody() {
    let { data } = useContext(ProfileDataContext);
    console.log(data);

    // Accessing the cart context to retrieve cart data and cart handling functions
    let { cartCont, cartHandling } = useContext(CounterContext);

    // Creating a shallow copy of the cart content for potential manipulations
    let cartContCopy = [...cartCont];

    // Variable to store the total price of items in the cart
    let totalPrice = 0;
    let tax = 1;
    let discount = -3;
    let ShippingPrice = 2;

    // Calculate the total price of items in the cart based on their quantity and price
    for (let index = 0; index < cartCont.length; index++) {
        totalPrice += Number(cartCont[index].price) * Number(cartCont[index].Quantity);
    }


    // Payment methods available for the checkout process
    let methods = [{ id: 1, name: "Credit Card" }, { id: 2, name: "Wallet" }, { id: 3, name: "Cash on Delivery" }];

    // State to track the selected payment method
    let [selectedTab, setSelectedTab] = useState(1);

    return (
        <div className="cart-body">
            {/* Shipping Address Section */}
            <div className="prods">
                <div className="prods-heading ">
                    <h2>Shipping Address</h2>
                </div>
                <div className="cart-products checkout-address">
                    <div className="l-side">
                        <div className="img-cont">
                            {/* Static image for the shipping address */}
                            <Image src={addressImage} alt='Loopz' className='address-img'></Image>
                        </div>
                        <div className="add-details">
                            {/* Displaying a pre-set shipping address */}
                            <h2>My Home</h2>
                            <h3>12 ElMorour st. kuwait</h3>
                        </div>
                    </div>
                    <div className="r-side">
                        {/* Icon for expanding or modifying address details */}
                        <i className="fa-solid fa-chevron-right"></i>
                    </div>
                </div>

                {/* Your Order Section */}
                <div className="prods-heading ">
                    <h2>Your Order</h2>
                </div>
                <div className="checkout-order cart-products">
                    {/* Check if the cart is empty */}
                    {
                        cartCont.length === 0 ? <p className='empty'>Cart is Empty</p> :
                            cartCont.map((item, index) =>
                                <div className="checkout-product" key={index}>
                                    {/* Displaying each product in the cart */}
                                    <div className="img-cont">
                                        <Image src={item.image} width={100} height={100} alt='product' className='product-img'></Image>
                                    </div>
                                    <div className="add-details">
                                        <h2>{item.name}</h2>
                                        <h3>{item.price} K.D</h3>
                                        <h4>Qnt : {item.Quantity}</h4>
                                    </div>
                                </div>
                            )
                    }
                </div>

                {/* Payment Method Section */}
                <div className="prods-heading ">
                    <h2>Payment Method</h2>
                </div>
                <div className="cart-products methods-cont">
                    {/* Tabs for selecting a payment method */}
                    <div className="tabs">
                        {methods.map((methd, index) =>
                            <div key={methd.id} className={`tab ${selectedTab == methd.id ? 'avtiveTab' : ""}`} onClick={() => {
                                setSelectedTab(methd.id); // Update the selected tab
                            }}>
                                <div className="tab-bullet-cont">
                                    <div className="bullet">
                                        {
                                            selectedTab == methd.id ? <div className="bullet-dot"></div> : null
                                        }
                                    </div>
                                    <span>{methd.name}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Display payment method details based on selected tab */}
                    <div className="methods-body">
                        {
                            selectedTab == 1 ?
                                <div className="credit-card method-body">
                                    <form action="">
                                        <div className="input-cont">
                                            <label htmlFor="cardNumber">Card Number</label>
                                            <input type="text" placeholder='0000 0000 0000 0000' maxLength={19}
                                                onKeyDown={(e) => {
                                                    //allowing only numbers and forward slash
                                                    if (e.key != "0" && e.key != "1" && e.key != "2" && e.key != "3" && e.key != "4" && e.key != "5" && e.key != "6" && e.key != "7" && e.key != "8" && e.key != "9" && e.key != "/" && e.key != "Backspace") {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="input-cont">
                                            <label htmlFor="cardNumber">Card Holder Name</label>
                                            <input type="text" placeholder='John Doe' />
                                        </div>
                                        <div className="due">
                                            <div className="input-cont">
                                                <label htmlFor="cardNumber">Expiry Date</label>
                                                <input type="text" placeholder='MM/YY' maxLength={5} onKeyDown={(e) => {
                                                    //getting the value of the input
                                                    if (e.target.value.length == 2 && e.key != "/" && e.key != "Backspace") {
                                                        e.target.value += "/";
                                                    }
                                                    //allowing only numbers and forward slash
                                                    if (e.key != "0" && e.key != "1" && e.key != "2" && e.key != "3" && e.key != "4" && e.key != "5" && e.key != "6" && e.key != "7" && e.key != "8" && e.key != "9" && e.key != "/" && e.key != "Backspace") {
                                                        e.preventDefault();
                                                    }
                                                }} />
                                            </div>
                                            <div className="input-cont">
                                                <label htmlFor="cardNumber">CVV</label>
                                                <input type="text" placeholder='000' maxLength={3}
                                                    onKeyDown={(e) => {
                                                        //allowing only numbers
                                                        //allowing only numbers and forward slash
                                                        if (e.key != "0" && e.key != "1" && e.key != "2" && e.key != "3" && e.key != "4" && e.key != "5" && e.key != "6" && e.key != "7" && e.key != "8" && e.key != "9" && e.key != "/" && e.key != "Backspace") {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                :
                                selectedTab == 2 ?
                                    <div className="wallet method-body">
                                        <div className="l-side">
                                            <div className="img-cont">
                                                {/* Static image for the wallet */}
                                                <Image src={wallet} alt='Loopz' className='wallet-img'></Image>
                                            </div>
                                            <div className="h">
                                                <h3>Wallet Balance</h3>
                                                <h4><span>{data?.balance || 0}</span> K.D</h4>
                                            </div>
                                        </div>
                                        {
                                            totalPrice + tax > Number(data?.balance) ?

                                                <div className="r-side">
                                                    <div className="img-cont">
                                                        {/* Static image for the TAA */}
                                                        <Image src={taa} alt='Loopz' className='taa-img'></Image>
                                                    </div>
                                                    <div className="worn-text">
                                                        <p><span>Sorry !</span> Your Wallet Balance Not Enough To Procced This order , Try Other Method Or Charge Your Wallet</p>
                                                    </div>
                                                </div>
                                                : null
                                        }
                                    </div>
                                    :
                                    <div className="cash-on-delivery method-body">Cash on Delivery</div>
                        }
                    </div>
                </div>
            </div>

            {/* Price Summary Section */}
            <div className="price-summary">
                <h2>Price Summary</h2>
                <div className="price-details">
                    {/* Total Items Price */}
                    <div className="input-cont">
                        <label htmlFor="Voucher">Voucher/Gift Card</label>
                        <input type="text" id='Voucher' name='Voucher' placeholder='Paste Voucher Code' />
                    </div>

                    <div className="flex-dit">
                        <div className="head">Total Items</div>
                        <div className="value">{totalPrice} K.D</div>
                    </div>
                    {/* Total VAT */}
                    <div className="flex-dit">
                        <div className="head">Total VAT</div>
                        <div className="value">1 K.D</div>
                    </div>
                    <div className="flex-dit">
                        <div className="head">Discount</div>
                        <div className="value dis-value">{discount} K.D</div>
                    </div>
                    <div className="flex-dit">
                        <div className="head">Shipping Price</div>
                        <div className="value">{ShippingPrice} K.D</div>
                    </div>
                </div>
                {/* Final Total */}
                <div className="total">
                    <div className="head">Total</div>
                    <div className="value">{totalPrice + tax + discount + ShippingPrice} K.D</div>
                </div>
                {/* Checkout Button */}
                <Link href={'/checkout'} className='addBtn'>Pay</Link>
            </div>
        </div >
    )
}
