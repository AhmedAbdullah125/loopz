'use client'
import Image from 'next/image'
import Link from 'next/link';
import parse from 'html-react-parser';
import React, { useContext, useState } from 'react'
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ProfileDataContext } from '@/app/Context/ProfileContext';
import wallet from '../../assets/checkout/wallet.png'
import Loading from '@/app/loading';
import { ticketCheckOut } from './ticketCheckOut';
import { checkCode } from '../checkout/checkCode';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function HomeTickets(tickets) {
    let dataTickets = tickets?.tickets
    let { data } = useContext(ProfileDataContext);
    let [productCount, setProductCount] = useState(1);
    let [bookmarks, setBookmarks] = useState([]); //bookMarks array
    let secBookmark = [];
    const router = useRouter();
    let [discount, setDiscount] = useState(0);
    let [code, setCode] = useState('');
    const handleCheckCode = async (dataTickets) => {
        await checkCode(dataTickets, setLoading, setDiscount, setCode);
    };
    const handleCheckout = async () => {
        const id = 4
        await ticketCheckOut(setLoading, selectedTab, id, code, productCount, router);
    }
    const [loading, setLoading] = useState(false);
    let methods = [{ id: 1, name: "Credit Card" }, { id: 2, name: "Wallet" }];
    let [selectedTab, setSelectedTab] = useState(1);

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
                            {dataTickets.normal_ticket.map((singleProduct) =>
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
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <button href={''} className='addBtn'>Book Now</button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        {/* <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle> */}
                                                        {
                                                            loading ? <Loading></Loading> :
                                                                <div className="ticket-checkout-cont">
                                                                    <div className="img-cont"> <Image src={singleProduct.image} width={100} height={100} alt='Loopz'></Image></div>
                                                                    <div className="price-cont">
                                                                        <h3>{singleProduct.name}</h3>
                                                                        <h4>{(Number(singleProduct.price) * productCount * ((100 + discount) / 100)) * 1.15} K.D</h4>
                                                                    </div>
                                                                    <div className="count-cont-discount">
                                                                        <div className="prod-count">
                                                                            <span className='minus' onClick={() => {
                                                                                if (productCount > 1) {
                                                                                    setProductCount(productCount - 1);
                                                                                }
                                                                            }}
                                                                            >-</span>
                                                                            <span className='count'>{productCount}</span>
                                                                            <span className='minus'
                                                                                onClick={() => {
                                                                                    setProductCount(productCount + 1);
                                                                                }}
                                                                            >+</span>

                                                                        </div>
                                                                    </div>
                                                                    <div className="input-cont">
                                                                        <label htmlFor="Voucher">Voucher/Gift Card</label>
                                                                        <div className="imp-btn-cont">
                                                                            <input type="text" id='Voucher' name='Voucher' placeholder='Paste Voucher Code' />
                                                                            <button disabled={loading} onClick={() => {

                                                                                if (document.getElementById("Voucher").value == "") {
                                                                                    document.getElementById("Voucher").style.border = "1px solid #C71919";
                                                                                    setTimeout(() => {
                                                                                        document.getElementById("Voucher").style.border = "1px solid #e0e0e0";
                                                                                    }, 2000);
                                                                                } else {
                                                                                    handleCheckCode(document.getElementById("Voucher").value);

                                                                                }

                                                                            }}>Apply</button>
                                                                        </div>
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

                                                                                    <div className="cash-on-delivery method-body">You will be directed to payment gateway</div>
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
                                                                                        </div>
                                                                                        :
                                                                                        <div className="cash-on-delivery method-body">Cash on Delivery</div>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                        }
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter className={"flex flex-col-reverse sm:flex-row sm:justify-center sm:space-x-2"}>
                                                        <AlertDialogCancel className="mt-2 sm:mt-0">Cancel</AlertDialogCancel>
                                                        <Button className="mt-2 sm:mt-0 bg-[#7a3abf]" onClick={() => {
                                                            handleCheckout();
                                                            console.log("clicked");
                                                        }}>Confirm</Button>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>

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
                            {dataTickets.combo_ticket.map((singleProduct) =>
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
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <button href={''} className='addBtn'>Book Now</button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        {/* <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle> */}
                                                        {
                                                            loading ? <Loading></Loading> :
                                                                <div className="ticket-checkout-cont">
                                                                    <div className="img-cont"> <Image src={singleProduct.image} width={100} height={100} alt='Loopz'></Image></div>
                                                                    <div className="price-cont">
                                                                        <h3>{singleProduct.name}</h3>
                                                                        <h4>{(Number(singleProduct.price) * productCount * ((100 + discount) / 100)) * 1.15} K.D</h4>
                                                                    </div>
                                                                    <div className="count-cont-discount">
                                                                        <div className="prod-count">
                                                                            <span className='minus' onClick={() => {
                                                                                if (productCount > 1) {
                                                                                    setProductCount(productCount - 1);
                                                                                }
                                                                            }}
                                                                            >-</span>
                                                                            <span className='count'>{productCount}</span>
                                                                            <span className='minus'
                                                                                onClick={() => {
                                                                                    setProductCount(productCount + 1);
                                                                                }}
                                                                            >+</span>

                                                                        </div>
                                                                    </div>
                                                                    <div className="input-cont">
                                                                        <label htmlFor="Voucher">Voucher/Gift Card</label>
                                                                        <div className="imp-btn-cont">
                                                                            <input type="text" id='Voucher' name='Voucher' placeholder='Paste Voucher Code' />
                                                                            <button disabled={loading} onClick={() => {

                                                                                if (document.getElementById("Voucher").value == "") {
                                                                                    document.getElementById("Voucher").style.border = "1px solid #C71919";
                                                                                    setTimeout(() => {
                                                                                        document.getElementById("Voucher").style.border = "1px solid #e0e0e0";
                                                                                    }, 2000);
                                                                                } else {
                                                                                    handleCheckCode(document.getElementById("Voucher").value);

                                                                                }

                                                                            }}>Apply</button>
                                                                        </div>
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

                                                                                    <div className="cash-on-delivery method-body">You will be directed to payment gateway</div>
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
                                                                                        </div>
                                                                                        :
                                                                                        <div className="cash-on-delivery method-body">Cash on Delivery</div>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                        }
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter className={"flex flex-col-reverse sm:flex-row sm:justify-center sm:space-x-2"}>
                                                        <AlertDialogCancel className="mt-2 sm:mt-0">Cancel</AlertDialogCancel>
                                                        <Button className="mt-2 sm:mt-0 bg-[#7a3abf]" onClick={() => {
                                                            handleCheckout();
                                                            console.log("clicked");
                                                        }}>Confirm</Button>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
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
