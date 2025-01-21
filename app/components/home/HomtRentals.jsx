'use client'
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import offer from '../../assets/Home/offer.svg'


export default function HomeRentals(rentals) {
    let data = rentals.rentals

    let [bookmarks, setBookmarks] = useState([]); //bookMarks array
    let secBookmark = [];

    return (
        <div className='home-rentals'>
            <div className="products">
                {
                    data.offers.length === 0 ? null :
                        <div className="cat-cat" key={"toysOffders"}>
                            <div className="products-group-title">
                                <p className="group-title">Offers</p>
                                <Link href={"/newArrival"} className='seeLink'>See all</Link>
                            </div>
                            <div className="d-none">
                            </div>
                            <div className="cards-cont">
                                <Swiper
                                    // navigation
                                    // pagination={{ type: "bullets", clickable: true }}
                                    spaceBetween={12}
                                    slidesPerView={7.5}
                                    autoplay={false}
                                    loop={false}
                                    modules={[Autoplay, Navigation, Pagination]}
                                    breakpoints={{
                                        1400: {
                                            slidesPerView: 4.2,
                                        },
                                        1100: {
                                            slidesPerView: 4.2,
                                        },
                                        767: {
                                            slidesPerView: 3.2,
                                        },
                                        768: {
                                            slidesPerView: 3.2,
                                            autoplay: false,
                                        },
                                        640: {
                                            slidesPerView: 2.1,
                                            autoplay: false,
                                        },
                                        100: {
                                            slidesPerView: 1.1,
                                            autoplay: false,
                                        },
                                    }}
                                >
                                    {data.offers.map((singleProduct) =>
                                        <SwiperSlide key={singleProduct.id}>
                                            <div className={`product-card`} >
                                                {singleProduct.discount > 0 ?
                                                    <div className="offerTag" style={{ backgroundImage: `url(${offer.src}` }}>
                                                        <p>{singleProduct.discount}% Sale</p>
                                                    </div>
                                                    : null
                                                }

                                                <i className={`${bookmarks.includes(singleProduct.id) || singleProduct.is_favorite ? 'fa-solid colored' : "fa-regular"} fa-bookmark `} onClick={() => {
                                                    if (bookmarks.includes(singleProduct.id)) {

                                                        //handle Add To Favourites 
                                                        secBookmark = [...bookmarks];
                                                        let index = secBookmark.indexOf(singleProduct.id);
                                                        secBookmark.splice(index, 1);
                                                        setBookmarks(secBookmark);
                                                    }
                                                    else {
                                                        //handle Remove From Favourites 
                                                        secBookmark = [...bookmarks];
                                                        secBookmark.push(singleProduct.id);
                                                        setBookmarks(secBookmark);
                                                    }
                                                }
                                                }></i>

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
                                            </div>
                                        </SwiperSlide>
                                    )}
                                </Swiper>
                            </div>
                        </div>
                }
                {data.category.map((category) =>
                    <div className="cat-cat" key={category.id}>
                        <div className="products-group-title">
                            <p className="group-title">{category.name}</p>
                            <Link href={`${category.name}`} className='seeLink'>See all</Link>
                        </div>
                        <div className="d-none">
                        </div>
                        <div className="cards-cont">
                            <Swiper
                                // navigation
                                // pagination={{ type: "bullets", clickable: true }}
                                spaceBetween={12}
                                slidesPerView={7.5}
                                autoplay={false}
                                loop={false}
                                modules={[Autoplay, Navigation, Pagination]}
                                breakpoints={{
                                    1400: {
                                        slidesPerView: 4.2,
                                    },
                                    1100: {
                                        slidesPerView: 4.2,
                                    },
                                    767: {
                                        slidesPerView: 3.2,
                                    },
                                    768: {
                                        slidesPerView: 3.2,
                                        autoplay: false,
                                    },
                                    640: {
                                        slidesPerView: 2.2,
                                        autoplay: false,
                                    },
                                    100: {
                                        slidesPerView: 1.1,
                                        autoplay: false,
                                    },
                                }}
                            >
                                {category.products.map((singleProduct) =>
                                    <SwiperSlide key={singleProduct.id}>
                                        <div className={`product-card`} >
                                            {singleProduct.discount > 0 ?
                                                <div className="offerTag" style={{ backgroundImage: `url(${offer.src}` }}>
                                                    <p>{singleProduct.discount}% Sale</p>
                                                </div>
                                                : null
                                            }

                                            <i className={`${bookmarks.includes(singleProduct.id) || singleProduct.is_favorite ? 'fa-solid colored' : "fa-regular"} fa-bookmark `} onClick={() => {
                                                if (bookmarks.includes(singleProduct.id)) {

                                                    //handle Add To Favourites 
                                                    secBookmark = [...bookmarks];
                                                    let index = secBookmark.indexOf(singleProduct.id);
                                                    secBookmark.splice(index, 1);
                                                    setBookmarks(secBookmark);
                                                }
                                                else {
                                                    //handle Remove From Favourites 
                                                    secBookmark = [...bookmarks];
                                                    secBookmark.push(singleProduct.id);
                                                    setBookmarks(secBookmark);
                                                }
                                            }
                                            }></i>

                                            <div className="img-cont">
                                                <Image src={singleProduct.image} alt='Loopz' width={300} height={300}></Image>
                                            </div>
                                            <Link href={`/product?id=${singleProduct.id}`} className="productName">{singleProduct.name}</Link>
                                            <span className='productCat'>{category.name}</span>
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
                                        </div>
                                    </SwiperSlide>
                                )}
                            </Swiper>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
