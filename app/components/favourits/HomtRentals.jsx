'use client'
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import offer from '../../assets/Home/offer.svg'
import { favourateToggle } from './favourateToggle';


export default function HomeRentals(rentals) {
    const handleFavorite = async (id) => {
        await favourateToggle(id, 'rentals');
    };
    let data = rentals.rentals
    console.log(data);
    let [bookmarks, setBookmarks] = useState([]); //bookMarks array
    let secBookmark = [];

    useEffect(() => {
        const secBookmark = [];
        for (let index = 0; index < data.length; index++) {
            if (!secBookmark.includes(data[index].id)) {
                secBookmark.push(data[index].id);
            }
        }
        setBookmarks(secBookmark);
    }, [data])
    console.log(bookmarks);

    return (
        <div className='home-rentals'>
            <div className="products">
                <div className="cat-cat">
                    <div className="d-none">
                    </div>
                    <div className="cards-cont">
                        <div className="favourates-cards">
                            {data.map((singleProduct) =>
                                <div className={`product-card`} key={index}>
                                    {singleProduct.discount > 0 ?
                                        <div className="offerTag" style={{ backgroundImage: `url(${offer.src}` }}>
                                            <p>{singleProduct.discount}% Sale</p>
                                        </div>
                                        : null
                                    }

                                    <i
                                        className={`${bookmarks.includes(singleProduct.id)
                                            ? 'fa-solid colored'
                                            : 'fa-regular'
                                            } fa-bookmark`}
                                        onClick={(event) => {
                                            handleFavorite(singleProduct.id);
                                            if (bookmarks.includes(singleProduct.id)) {
                                                // Handle remove from favorites
                                                const secBookmark = [...bookmarks];
                                                const index = secBookmark.indexOf(singleProduct.id);
                                                secBookmark.splice(index, 1);
                                                setBookmarks(secBookmark);
                                            } else {
                                                // Handle add to favorites
                                                const secBookmark = [...bookmarks];
                                                secBookmark.push(singleProduct.id);
                                                setBookmarks(secBookmark);
                                            }
                                        }}
                                    ></i>

                                    <Link href={`/product?id=${singleProduct.id}`}>
                                        <div className="img-cont">
                                            <Image src={singleProduct.image} alt='Loopz' width={300} height={300}></Image>
                                        </div>
                                        <Link href={`/product?id=${singleProduct.id}`} className="productName">{singleProduct.name}</Link>
                                        <span className='productCat'>{singleProduct.category.name}</span>
                                        <div className="rate">
                                            <i className={`fa-solid fa-star ${singleProduct.rate >= 1 ? "golden" : ""}`}></i>
                                            <i className={`fa-solid fa-star ${singleProduct.rate >= 2 ? "golden" : ""}`}></i>
                                            <i className={`fa-solid fa-star ${singleProduct.rate >= 3 ? "golden" : ""}`}></i>
                                            <i className={`fa-solid fa-star ${singleProduct.rate >= 4 ? "golden" : ""}`}></i>
                                            <i className={`fa-solid fa-star ${singleProduct.rate >= 5 ? "golden" : ""}`}></i>
                                        </div>
                                        <div className="price-period">
                                            <h4 className='productPrice'>{singleProduct.price} K.D</h4>
                                            <h6 className='period'>1 day</h6>
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
