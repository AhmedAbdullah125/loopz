'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import van from '../../assets/products/van.svg'
import Image from 'next/image';
export default function ProductDetails({ product, title }) {
    let [productCount, setProductCount] = useState(1);
    let [display, setDisplay] = useState("none");

    return (
        <div className={`ProductDetails  col col-md-6 ${title == "Ticket" ? "ticket-productDetails" : ""}`}>
            <h3 className='product-name'>{product.name}</h3>
            {
                title == "Ticket" ? null :
                    <>
                        <h4 className='product-cat'>{product.category.name}</h4>

                        <div className="rate">
                            <div className="stars">
                                <i className={`${product.rate >= 1 ? "goldenStar" : "grayStar"} fa-solid fa-star`} ></i>
                                <i className={`${product.rate >= 2 ? "goldenStar" : "grayStar"} fa-solid fa-star`} ></i>
                                <i className={`${product.rate >= 3 ? "goldenStar" : "grayStar"} fa-solid fa-star`} ></i>
                                <i className={`${product.rate >= 4 ? "goldenStar" : "grayStar"} fa-solid fa-star`} ></i>
                                <i className={`${product.rate >= 5 ? "goldenStar" : "grayStar"} fa-solid fa-star`} ></i>
                            </div>
                            <p> ( based on {product.total_reviews} reviews ) </p>
                        </div>
                    </>
            }
            {
                title !== "Ticket" ? null :
                    <>
                        <p className='tickets-text'>{product.text}</p>
                        <p className='tickets-persons'>{product.persons} person</p>
                    </>
            }
            <p className='prod-price'>{product.price} K.D</p>
            <div className="count-cont">
                <div className="prod-count">
                    <span className='minus' onClick={() => {
                        if (productCount > 1) {
                            setProductCount(productCount - 1);
                            setDisplay("none");
                        }
                    }}
                    >-</span>
                    <span className='count'>{productCount}</span>
                    <span className='minus'
                        onClick={() => {
                            if (productCount == product.availability_number) {
                                setDisplay("block");

                            }
                            else {
                                setProductCount(productCount + 1);
                                setDisplay("none");
                            }
                        }}
                    >+</span>

                </div>
                <p className='availability' style={{ display: display }}>Only {product.availability_number} available</p>
            </div>
            {
                title == "Ticket" ? null :
                    <div className="van-hint">
                        <div className="img">
                            <Image src={van} alt='loopz' className='van-img'></Image>
                        </div>
                        <p className='hinrP'>Order before 7 PM and receive it at the same day. except for chalet and sabah al salem area</p>
                    </div>
            }
            {
                title == "Ticket" ? null :
                    <p className='policies'> Read More About <Link href={'/policies'}><span>Return Policy</span></Link>  </p>
            }
            <Link className='cartLink' href={''}>{title == "toys" ? "Add to Cart" : "Purchase"}</Link>
        </div>
    )
}