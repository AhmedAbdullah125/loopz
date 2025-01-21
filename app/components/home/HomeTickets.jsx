'use client'
import Image from 'next/image'
import Link from 'next/link';
import parse from 'html-react-parser';
import React, { useState } from 'react'
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import offer from '../../assets/Home/offer.svg'

export default function HomeTickets(tickets) {
    let data = tickets?.tickets
    let [bookmarks, setBookmarks] = useState([]); //bookMarks array
    let secBookmark = [];
    return (
        <div className='home-tickets'>
            <div className="products" >
                <div className="cat-cat">
                    <div className="products-group-title">
                        <p className="group-title">Normal Ticket</p>
                        <Link href={""} className='seeLink'>See all</Link>
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
                            {data.normal_ticket.map((singleProduct) =>
                                <SwiperSlide key={singleProduct.id}>
                                    <div className="product-ticket">
                                        <div className="img-cont">
                                            <Image src={singleProduct.image} width={100} height={100} alt='Loopz'></Image>
                                            <div className="prod-price">
                                                <span className='num'>{singleProduct.price}</span>
                                                <span className='curr'>K.D</span>
                                            </div>
                                        </div>
                                        <div className="data-cont">
                                            <Link href={`/ticket?id=${singleProduct.id}`} className="productName">{singleProduct.name}</Link>
                                            <div className="feature-cont">
                                                {parse(singleProduct.description)}
                                            </div>
                                            <div className="circul"></div>
                                            <div className="circul circul2"></div>
                                            <Link href={''} className='addBtn'>Book Now</Link>
                                        </div>
                                    </div>

                                </SwiperSlide>
                            )}
                        </Swiper>
                    </div>
                </div>
                <div className="cat-cat">
                    <div className="products-group-title">
                        <p className="group-title">Combo Ticket</p>
                        <Link href={""} className='seeLink'>See all</Link>
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
                            {data.combo_ticket.map((singleProduct) =>
                                <SwiperSlide key={singleProduct.id}>
                                    <div className="product-ticket">
                                        <div className="img-cont">
                                            <Image src={singleProduct.image} width={100} height={100} alt='Loopz'></Image>
                                            <div className="prod-price">
                                                <span className='num'>{singleProduct.price}</span>
                                                <span className='curr'>K.D</span>
                                            </div>
                                        </div>
                                        <div className="data-cont">
                                            <Link href={`/ticket?id=${singleProduct.id}`} className="productName">{singleProduct.name}</Link>
                                            <div className="feature-cont">
                                                {parse(singleProduct.description)}
                                            </div>
                                            <div className="circul"></div>
                                            <div className="circul circul2"></div>
                                            <Link href={''} className='addBtn'>Book Now</Link>
                                        </div>
                                    </div>

                                </SwiperSlide>
                            )}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}
