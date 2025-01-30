'use client'
import Image from 'next/image'
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import offer from '../../assets/Home/offer.svg'
import { CounterContext } from '@/app/Context/CounterContext';
import { toast } from 'sonner';
import { favourateToggle } from './favourateToggle';

export default function HomeToys(toys) {
    const handleFavorite = async (id) => {
        await favourateToggle(id, 'toys');
    };
    let { cartCont, cartHandling } = useContext(CounterContext);
    let data = toys.toys;
    console.log(data);

    let [bookmarks, setBookmarks] = useState([]); //bookMarks array
    let [cart, setCart] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);
    // let newData = [{ name: "Offers", details: [...data.offers] }, { name: "New Arrival", details: [...data.new_arrival] },]
    // for (let i = 0; i < data.category.length; i++) {
    //     newData.push({ name: data.category[i].name, details: data.category[i].toys })
    // }
    let [addStatus, setAddStatus] = useState('Successfully Added to cart');
    useEffect(() => {
        const secBookmark = [];
        for (let index = 0; index < data.length; index++) {
            if (data[index].id && !secBookmark.includes(data[index].id)) {
                secBookmark.push(data[index].id);
            }
        }
        setBookmarks(secBookmark);
    }, [data])
    return (
        <div className='home-toys'>
            <div className="products">

                <div className="cat-cat">
                    {/* <div className="products-group-title">
                                    <p className="group-title">{item.name}</p>
                                    <Link href={`/${item.name === 'New Arrival' ? 'new-arrival' : item.name.toLowerCase()}`} className='seeLink'>See all</Link>
                                </div> */}
                    <div className="d-none">
                    </div>
                    <div className="cards-cont">
                        <div className="favourates-cards" >
                            {data.map((singleProduct, index) =>
                                <div className={`product-card`} key={index}>
                                    {singleProduct.discount > 0 ? (
                                        <div className="offerTag" style={{ backgroundImage: `url(${offer.src}` }}>
                                            <p>{singleProduct.discount}% Sale</p>
                                        </div>
                                    ) : null}

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

                                    <Link href={`/toy?id=${singleProduct.id}`} className="img-cont">
                                        <Image src={singleProduct.image} alt="Loopz" width={144} height={144}></Image>
                                    </Link>
                                    <Link href={`/toy?id=${singleProduct.id}`} className="productName">
                                        {singleProduct.name}
                                    </Link>
                                    {/* <span className='productCat'>{singleProduct.category.name}</span> */}
                                    <Link href={`/toy?id=${singleProduct.id}`} className="rate">
                                        <i className={`fa-solid fa-star ${singleProduct.rate >= 1 ? 'golden' : ''}`}></i>
                                        <i className={`fa-solid fa-star ${singleProduct.rate >= 2 ? 'golden' : ''}`}></i>
                                        <i className={`fa-solid fa-star ${singleProduct.rate >= 3 ? 'golden' : ''}`}></i>
                                        <i className={`fa-solid fa-star ${singleProduct.rate >= 4 ? 'golden' : ''}`}></i>
                                        <i className={`fa-solid fa-star ${singleProduct.rate >= 5 ? 'golden' : ''}`}></i>
                                    </Link>
                                    <Link href={`/toy?id=${singleProduct.id}`} className="price-period">
                                        <h4 className="productPrice">{singleProduct.price} K.D</h4>
                                    </Link>

                                    <button
                                        className="addBtn"
                                        onClick={() => {
                                            for (let index = 0; index < cartCont.length; index++) {
                                                if (cartCont[index].id === singleProduct.id) {
                                                    setAddStatus('Already Added to cart');
                                                    toast('Already Added to cart', {
                                                        style: {
                                                            borderColor: '#dc3545',
                                                            boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)',
                                                        },
                                                        description: 'This item is already added to your cart',
                                                    });
                                                    return;
                                                }
                                            }
                                            if (cartCont.includes(singleProduct)) {
                                                toast('Already Added to cart', {
                                                    style: {
                                                        borderColor: '#28a745',
                                                        boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)',
                                                    },
                                                    description: 'This item is already added to your cart',
                                                });
                                            } else {
                                                setCart([...cart, singleProduct]);
                                                if (JSON.parse(localStorage.getItem('cart')) === null) {
                                                    localStorage.setItem('cart', JSON.stringify([]));
                                                } else {
                                                    localStorage.setItem(
                                                        'cart',
                                                        JSON.stringify([
                                                            ...JSON.parse(localStorage.getItem('cart')),
                                                            { ...singleProduct, Quantity: 1 },
                                                        ])
                                                    );
                                                }
                                                cartHandling([...cartCont, { ...singleProduct, Quantity: 1 }]);
                                                setAddStatus('Successfully Added to cart');
                                                toast('Successfully Added to cart', {
                                                    style: {
                                                        borderColor: '#28a745',
                                                        boxShadow: '0px 0px 10px rgba(40, 167, 69, .5)',
                                                    },
                                                    description: 'This item is successfully added to your cart',
                                                });
                                            }
                                        }}
                                    >
                                        Add To Cart
                                    </button>
                                </div>

                            )}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
