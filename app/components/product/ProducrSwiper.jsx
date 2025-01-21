'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
export default function ProducrSwiper(data) {
    let [product, setProduct] = useState(data.product);

    let [selectedImg, setSelectedImg] = useState(product.image);
    return (
        <div className="ProducrSwiper col col-md-6">
            <div className="mainImgCont">
                <Image src={selectedImg} alt='products' className='main-img' width={100} height={100}></Image>
            </div>
            <Swiper
                // navigation

                spaceBetween={10}
                slidesPerView={6}
                autoplay={true}
                loop={true}
                modules={[Autoplay, Navigation, Pagination]}
                breakpoints={{
                    1400: {
                        slidesPerView: 6,
                    },
                    1100: {
                        slidesPerView: 4,
                    },
                    767: {
                        slidesPerView: 6,
                    },
                    768: {
                        slidesPerView: 3,
                        autoplay: false,
                    },
                    640: {
                        slidesPerView: 4,
                        autoplay: false,
                    },

                    100: {
                        slidesPerView: 3,
                        autoplay: false,
                    },
                }}
            >

                {
                    product.images.map((img, index) =>
                        <SwiperSlide key={index}>
                            <div className="slide-img-cont" onClick={() => { setSelectedImg(img.url) }}>
                                <Image src={img.url} width={100} height={100} alt='Loops' />
                            </div>
                        </SwiperSlide>
                    )
                }

            </Swiper>
        </div>
    )
}