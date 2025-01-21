'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import cube from '../../assets/Home/cube.png'
import Rentals from '../../assets/Home/Rentals.svg'
import Tickets from '../../assets/Home/Tickets.svg'
import offer from '../../assets/Home/offer.svg'
import Link from 'next/link'
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from 'axios'
import Loading from '@/app/loading'
export default function HomeContent() {
    let [selectedTab, setSelectedTab] = useState('Toys');
    let [selectedIndex, setSelectedIndex] = useState(0);
    let [bookmarks, setBookmarks] = useState([]); //bookMarks array
    let secBookmark = [];
    let products = [{ id: "01", title: "Toys", img: cube, }, { id: "02", title: "Rentals", img: Rentals, }, { id: "03", title: "Tickets", img: Tickets, }]
    const [data, setData] = useState(null);  // State to store fetched data
    const [toys, setToys] = useState(null);  // State to store fetched data
    const [rentals, setRentals] = useState(null);  // State to store fetched data
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [error, setError] = useState(null); // State for error handling
    useEffect(() => {
        setLoading(true)
        const getHomeData = async () => {
            try {
                const toysResponse = await axios.get("https://loopz-q8.com/api/toys-home");
                let toys = toysResponse.data.data;
                const rentalResponse = await axios.get("https://loopz-q8.com/api/products-home");
                let rentals = rentalResponse.data.data;
                if (selectedIndex == 0) {
                    setData(toys)
                }
                else if (selectedIndex == 1) {
                    setData(rentals)
                }
                setToys(toys)
                setLoading(false)
            } catch (error) {
                console.error('Error retrieving data:', error);
                throw new Error('Could not get data');
                setLoading(false)
            }
        };
        getHomeData();

    }, []);
    return (
        <div className="">
            {loading ? <Loading></Loading> :
                <div className='container HomeContentHeader'>
                    <div className="tabs" >
                        {products.map((product, index) =>
                            <div key={product.id} className={`tab ${selectedTab == product.title ? 'avtiveTab' : ""}`} onClick={() => {
                                setSelectedIndex(index);
                                setSelectedTab(product.title);
                                if (index == 0) {
                                    setData(toys)
                                }
                                else {
                                    setData(rentals)
                                }
                            }}>
                                <Image className='' alt='loopz' src={product.img}></Image>
                                <span>{product.title}</span>
                            </div>
                        )}
                    </div>
                    {selectedIndex < 2 ?
                        <div className="products">
                            {data.new_arrival.length > 0 ?
                                <div className="cat-cat" key={"toysNewArrival"}>
                                    <div className="products-group-title">
                                        <p className="group-title">New Arrival</p>
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
                                                    slidesPerView: 4,
                                                },
                                                1100: {
                                                    slidesPerView: 4,
                                                },
                                                767: {
                                                    slidesPerView: 3,
                                                },
                                                768: {
                                                    slidesPerView: 3,
                                                    autoplay: false,
                                                },
                                                640: {
                                                    slidesPerView: 2,
                                                    autoplay: false,
                                                },
                                                100: {
                                                    slidesPerView: 1,
                                                    autoplay: false,
                                                },
                                            }}
                                        >
                                            {data?.new_arrival?.map((singleProduct) =>
                                                <SwiperSlide key={singleProduct.id}>
                                                    {selectedIndex < 2 ?
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
                                                                {selectedIndex == 1 ? <h6 className='period'>1 day</h6> : null}
                                                            </div>
                                                            {selectedIndex == 0 ? <Link href={''} className='addBtn'>Add To Cart</Link> : null}
                                                        </div>
                                                        :
                                                        <div className="product-ticket">
                                                            <div className="img-cont">
                                                                <Image src={singleProduct.img} alt='Loopz'></Image>
                                                                <div className="prod-price">
                                                                    <span className='num'>{singleProduct.price}</span>
                                                                    <span className='curr'>K.D</span>
                                                                </div>
                                                            </div>
                                                            <div className="data-cont">
                                                                <Link href={"/product"} className="productName">{singleProduct.productTitle}</Link>
                                                                <div className="feature-cont">
                                                                    <ul>
                                                                        {singleProduct.features.map((feature, index) =>
                                                                            <li key={index}>{feature}</li>
                                                                        )}
                                                                    </ul>
                                                                </div>
                                                                <div className="circul"></div>
                                                                <div className="circul circul2"></div>
                                                                <Link href={''} className='addBtn'>Book Now</Link>

                                                            </div>
                                                        </div>
                                                    }
                                                </SwiperSlide>
                                            )}
                                        </Swiper>
                                    </div>
                                </div> : null
                            }
                            {
                                data?.offers.length > 0 ?
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
                                                        slidesPerView: 4,
                                                    },
                                                    1100: {
                                                        slidesPerView: 4,
                                                    },
                                                    767: {
                                                        slidesPerView: 3,
                                                    },
                                                    768: {
                                                        slidesPerView: 3,
                                                        autoplay: false,
                                                    },
                                                    640: {
                                                        slidesPerView: 2,
                                                        autoplay: false,
                                                    },
                                                    100: {
                                                        slidesPerView: 1,
                                                        autoplay: false,
                                                    },
                                                }}
                                            >
                                                {data?.offers.map((singleProduct) =>
                                                    <SwiperSlide key={singleProduct.id}>
                                                        {selectedIndex < 2 ?
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
                                                                    {selectedIndex == 1 ? <h6 className='period'>1 day</h6> : null}
                                                                </div>
                                                                {selectedIndex == 0 ? <Link href={''} className='addBtn'>Add To Cart</Link> : null}
                                                            </div>
                                                            :
                                                            <div className="product-ticket">
                                                                <div className="img-cont">
                                                                    <Image src={singleProduct.img} alt='Loopz'></Image>
                                                                    <div className="prod-price">
                                                                        <span className='num'>{singleProduct.price}</span>
                                                                        <span className='curr'>K.D</span>
                                                                    </div>
                                                                </div>
                                                                <div className="data-cont">
                                                                    <Link href={"/product"} className="productName">{singleProduct.productTitle}</Link>
                                                                    <div className="feature-cont">
                                                                        <ul>
                                                                            {singleProduct.features.map((feature, index) =>
                                                                                <li key={index}>{feature}</li>
                                                                            )}
                                                                        </ul>
                                                                    </div>
                                                                    <div className="circul"></div>
                                                                    <div className="circul circul2"></div>
                                                                    <Link href={''} className='addBtn'>Book Now</Link>

                                                                </div>
                                                            </div>
                                                        }
                                                    </SwiperSlide>
                                                )}
                                            </Swiper>
                                        </div>
                                    </div>
                                    : null
                            }
                            {data?.category.map((category) =>
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
                                                    slidesPerView: 4,
                                                },
                                                1100: {
                                                    slidesPerView: 4,
                                                },
                                                767: {
                                                    slidesPerView: 3,
                                                },
                                                768: {
                                                    slidesPerView: 3,
                                                    autoplay: false,
                                                },
                                                640: {
                                                    slidesPerView: 2,
                                                    autoplay: false,
                                                },
                                                100: {
                                                    slidesPerView: 1,
                                                    autoplay: false,
                                                },
                                            }}
                                        >
                                            {category.toys.map((singleProduct) =>
                                                <SwiperSlide key={singleProduct.id}>
                                                    {selectedIndex < 2 ?
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
                                                                {selectedIndex == 1 ? <h6 className='period'>1 day</h6> : null}
                                                            </div>
                                                            {selectedIndex == 0 ? <Link href={''} className='addBtn'>Add To Cart</Link> : null}
                                                        </div>
                                                        :
                                                        <div className="product-ticket">
                                                            <div className="img-cont">
                                                                <Image src={singleProduct.img} alt='Loopz'></Image>
                                                                <div className="prod-price">
                                                                    <span className='num'>{singleProduct.price}</span>
                                                                    <span className='curr'>K.D</span>
                                                                </div>
                                                            </div>
                                                            <div className="data-cont">
                                                                <Link href={"/product"} className="productName">{singleProduct.productTitle}</Link>
                                                                <div className="feature-cont">
                                                                    <ul>
                                                                        {singleProduct.features.map((feature, index) =>
                                                                            <li key={index}>{feature}</li>
                                                                        )}
                                                                    </ul>
                                                                </div>
                                                                <div className="circul"></div>
                                                                <div className="circul circul2"></div>
                                                                <Link href={''} className='addBtn'>Book Now</Link>

                                                            </div>
                                                        </div>
                                                    }
                                                </SwiperSlide>
                                            )}
                                        </Swiper>
                                    </div>
                                </div>
                            )}
                        </div>
                        : ""}
                    <div className="products" key={"allKey"}>
                        {
                            products[selectedIndex].data.map((product) =>
                                <div className="cat-cat" key={product.id}>
                                    <div className="products-group-title">
                                        <p className="group-title">{product.title}</p>
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
                                                    slidesPerView: 4,
                                                },
                                                1100: {
                                                    slidesPerView: 4,
                                                },
                                                767: {
                                                    slidesPerView: 3,
                                                },
                                                768: {
                                                    slidesPerView: 3,
                                                    autoplay: false,
                                                },
                                                640: {
                                                    slidesPerView: 2,
                                                    autoplay: false,
                                                },
                                                100: {
                                                    slidesPerView: 1,
                                                    autoplay: false,
                                                },
                                            }}
                                        >
                                            {product.data.map((singleProduct) =>
                                                <SwiperSlide key={singleProduct.id}>
                                                    {selectedIndex < 2 ?
                                                        "sws"
                                                        :
                                                        <div className="product-ticket">
                                                            <div className="img-cont">
                                                                <Image src={singleProduct.img} alt='Loopz'></Image>
                                                                <div className="prod-price">
                                                                    <span className='num'>{singleProduct.price}</span>
                                                                    <span className='curr'>K.D</span>
                                                                </div>
                                                            </div>
                                                            <div className="data-cont">
                                                                <Link href={"/product"} className="productName">{singleProduct.productTitle}</Link>
                                                                <div className="feature-cont">
                                                                    <ul>
                                                                        {singleProduct.features.map((feature, index) =>
                                                                            <li key={index}>{feature}</li>
                                                                        )}
                                                                    </ul>
                                                                </div>
                                                                <div className="circul"></div>
                                                                <div className="circul circul2"></div>
                                                                <Link href={''} className='addBtn'>Book Now</Link>

                                                            </div>
                                                        </div>
                                                    }
                                                </SwiperSlide>
                                            )}
                                        </Swiper>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            }
        </div>
    )
}
