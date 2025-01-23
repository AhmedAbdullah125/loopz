'use client'
import Image from 'next/image'
import Link from 'next/link';
import React, { useContext, useState } from 'react'
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import offer from '../../assets/Home/offer.svg'
import { CounterContext } from '@/app/Context/CounterContext';
import e from 'cors';
import { toast } from 'sonner';

export default function HomeToys(toys) {

    const popover = (
        <Popover id="popover-basic">
            {/* <Popover.Header as="h3">Popover right</Popover.Header> */}
            <Popover.Body>
                added
            </Popover.Body>
        </Popover>
    );

    let { cartCont, cartHandling } = useContext(CounterContext);
    let data = toys.toys
    let [bookmarks, setBookmarks] = useState([]); //bookMarks array
    let secBookmark = [];
    let [cart, setCart] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);
    let newData = [{ name: "Offers", details: [...data.offers] }, { name: "New Arrival", details: [...data.new_arrival] },]
    for (let i = 0; i < data.category.length; i++) {
        newData.push({ name: data.category[i].name, details: data.category[i].toys })
    }
    let [addStatus, setAddStatus] = useState('Successfully Added to cart');
    return (
        <div className='home-toys'>
            <div className="products">
                {
                    newData.map((item, index) =>
                        item.details.length === 0 ? null :
                            <div className="cat-cat" key={index}>
                                <div className="products-group-title">
                                    <p className="group-title">{item.name}</p>
                                    <Link href={`/${item.name === 'New Arrival' ? 'new-arrival' : item.name.toLowerCase()}`} className='seeLink'>See all</Link>
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
                                        {item.details.map((singleProduct, index) =>
                                            <SwiperSlide key={index}>
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
                                                        <Image src={singleProduct.image} alt='Loopz' width={144} height={144}></Image>
                                                    </div>
                                                    <Link href={`/toy?id=${singleProduct.id}`} className="productName">{singleProduct.name}</Link>
                                                    {/* <span className='productCat'>{singleProduct.category.name}</span> */}
                                                    <div className="rate">
                                                        <i className={`fa-solid fa-star ${singleProduct.rate >= 1 ? "golden" : ""}`}></i>
                                                        <i className={`fa-solid fa-star ${singleProduct.rate >= 2 ? "golden" : ""}`}></i>
                                                        <i className={`fa-solid fa-star ${singleProduct.rate >= 3 ? "golden" : ""}`}></i>
                                                        <i className={`fa-solid fa-star ${singleProduct.rate >= 4 ? "golden" : ""}`}></i>
                                                        <i className={`fa-solid fa-star ${singleProduct.rate >= 5 ? "golden" : ""}`}></i>
                                                    </div>
                                                    <div className="price-period">
                                                        <h4 className='productPrice'>{singleProduct.price} K.D</h4>

                                                    </div>

                                                    <button className='addBtn'
                                                        onClick={() => {

                                                            for (let index = 0; index < cartCont.length; index++) {
                                                                if (cartCont[index].id === singleProduct.id) {
                                                                    setAddStatus('Already Added to cart');
                                                                    toast("Already Added to cart", {
                                                                        style: {
                                                                            borderColor: "#dc3545",
                                                                            boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)'
                                                                        },
                                                                        description: "This item is already added to your cart",

                                                                    })
                                                                    return;
                                                                }

                                                            }
                                                            if (cartCont.includes(singleProduct)) {
                                                                toast("Already Added to cart", {
                                                                    style: {
                                                                        borderColor: "#28a745",
                                                                        boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)'
                                                                    },
                                                                    description: "This item is already added to your cart",

                                                                })

                                                            }
                                                            else {
                                                                setCart([...cart, singleProduct]);
                                                                if (JSON.parse(localStorage.getItem('cart')) === null) {
                                                                    localStorage.setItem('cart', JSON.stringify([]));
                                                                }
                                                                else {
                                                                    localStorage.setItem('cart', JSON.stringify([...JSON.parse(localStorage.getItem('cart')), { ...singleProduct, Quantity: 1 }]));
                                                                }
                                                                cartHandling([...cartCont, { ...singleProduct, Quantity: 1 }]);
                                                                setAddStatus('Successfully Added to cart');
                                                                toast("Successfully Added to cart", {
                                                                    style: {
                                                                        borderColor: "#28a745",
                                                                        boxShadow: '0px 0px 10px rgba(40, 167, 69, .5)'
                                                                    },
                                                                    description: "This item is successfully added to your cart",

                                                                })
                                                            }

                                                        }}
                                                    >Add To Cart</button>

                                                </div>
                                            </SwiperSlide>
                                        )}
                                    </Swiper>
                                </div>
                            </div>
                    )
                }
            </div>
        </div>
    )
}
