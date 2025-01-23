'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { API_BASE_URL } from "@/lib/apiConfig";
import axios from "axios";
import Loading from "@/app/loading";
import { useRouter, useSearchParams } from "next/navigation";
import wallet from '../../assets/profile/wallet.png';
import card from '../../assets/profile/card.svg';
import cash from '../../assets/profile/cash.avif';
import marker from '../../assets/marker.svg';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { cancelOrder } from "../../profile/order/cancelOeder";

export default function Orders() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'))
    const searchParams = useSearchParams();
    const [id, setd] = useState(searchParams.get('id'));
    const router = useRouter();
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        setToken(savedToken);
        if (!savedToken) {
            router.push('/login');
        }
        setLoading(true)
        const getTickets = async () => {
            try {
                const response = await axios.get(API_BASE_URL + `/orders/` + id, {
                    headers: {
                        'Accept-Language': 'en',
                        Authorization: `Bearer ${token}`,
                    },
                });
                let data = response.data.data;
                setData(data)
                setLoading(false)
            } catch (error) {
                console.error('Error retrieving data:', error);
                throw new Error('Could not get data');
                setLoading(false)
            }
        };
        getTickets();
    }, []);


    const handleCancel = (id) => {
        cancelOrder(setLoading, id, router);

    };

    return (
        <>
            {
                loading ? <Loading /> :
                    <div className="edit-profile-cont profile-order ">
                        <h3>My Orders</h3>
                        <div className="profile-r-side">
                            <div className="add-new-address-heading">
                                <i className="fa-solid fa-arrow-left-long" onClick={() => router.back()}></i>
                                <span>#  {data.id}</span>
                            </div>
                            <h4 className="order-date">Ordered on {data.date}</h4>
                            <div className="order-progress-cont">
                                <div className="order-progress-bar">
                                    <div className={`order-bar ${data.status == "in_the_way" || data.status == "delivered" || data.status == "confirmed" || data.status == "shipped" ? "active-bar" : ""}`} >
                                        <div className={`progress-bull ${data.status == "placed" || data.status == "in_the_way" || data.status == "delivered" || data.status == "confirmed" || data.status == "shipped" ? "active-bullet" : ""}`}>
                                            <div className="bullet"></div>
                                            <span>Placed</span>
                                        </div>
                                    </div>
                                    <div className={`order-bar ${data.status == "in_the_way" || data.status == "delivered" || data.status == "shipped" ? "active-bar" : ""}`}>
                                        <div className={`progress-bull ${data.status == "in_the_way" || data.status == "delivered" || data.status == "confirmed" || data.status == "shipped" ? "active-bullet" : ""}`}>
                                            <div className="bullet"></div>
                                            <span>Confirmed</span>
                                        </div>
                                    </div>
                                    <div className={`order-bar ${data.status == "in_the_way" || data.status == "delivered" ? "active-bar" : ""}`}>
                                        <div className={`progress-bull ${data.status == "in_the_way" || data.status == "delivered" || data.status == "shipped" ? "active-bullet" : ""}`}>
                                            <div className="bullet"></div>
                                            <span>Shipped</span>
                                        </div>
                                    </div>
                                    <div className={`order-bar ${data.status == "delivered" ? "active-bar" : ""}`}>
                                        <div className={`progress-bull  ${data.status == "in_the_way" || data.status == "delivered" ? "active-bullet" : ""}`}>
                                            <div className="bullet"></div>
                                            <span>In the way</span>
                                        </div>
                                        <div className={`progress-bull lastbull ${data.status == "delivered" ? "active-bullet" : ""}`}>
                                            <div className="bullet"></div>
                                            <span>Delivered</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h3 className="tab-title">Order Items</h3>
                            <div className="tab-content-tickets">

                                {
                                    data.order_items.map((item, index) =>
                                        <div className="ticket-cont ticket-cont-list" key={item.id}>
                                            <div className="l-side">
                                                <div className="img-cont-small img-cont-small-order">
                                                    <Image src={item.items.image} width={100} height={100} alt="Loops" className="img-of-ticket" />
                                                </div>
                                                <div className="text-cont">
                                                    <h3>{item.items.name}</h3>
                                                    <h5><span className="heavy">{item.items.price} K.D</span></h5>
                                                    <h4>Qnt : <span className="heavy">{item.quantity}</span></h4>
                                                </div>
                                            </div>
                                            <div className="r-side">
                                                <button className="cancel-order-btn review-btn" >Add Review</button>
                                            </div>

                                        </div>
                                    )
                                }

                            </div>
                            <div className="related-text pay-method order-address">
                                <h3>Shipping Address</h3>
                                <div className="sub-ticket-cont">
                                    <div className="img-cont-small">
                                        <Image src={marker} width={100} height={100} alt="Loops" className="img-of-ticket" />
                                    </div>
                                    <div className="text-cont">
                                        <h5>{data.address.address}</h5>
                                        <h6 className="address-details">{data.address.street}, {data.address.city.name}, {data.address.governorate.name}</h6>
                                    </div>
                                </div>

                            </div>
                            <div className="related-text pay-method">
                                <h3>Payment Method</h3>
                                <div className="sub-ticket-cont">
                                    <div className="img-cont-small">
                                        {
                                            data.payment_method == "card" ?
                                                <Image src={card} width={100} height={100} alt="Loops" className="img-of-ticket" />
                                                : data.payment_method_text == "cash" ?
                                                    <Image src={cash} width={100} height={100} alt="Loops" className="img-of-ticket" />
                                                    : data.payment_method_text == "wallet" ?
                                                        <Image src={wallet} width={100} height={100} alt="Loops" className="img-of-ticket" />
                                                        : null
                                        }
                                    </div>
                                    <div className="text-cont">
                                        <h5>{data.payment_method_text}</h5>
                                    </div>
                                </div>

                            </div>
                            <div className="summary">
                                <h3>Price Summary</h3>
                                <div className="summ-cont">
                                    <div className="sub-summ-cont">
                                        <h4>Total Items</h4>
                                        <h5>{data.sub_total}</h5>
                                    </div>
                                    <div className="sub-summ-cont">
                                        <h4>Total VAT</h4>
                                        <h5>{data.total_vat}</h5>
                                    </div>
                                    <div className="sub-summ-cont">
                                        <h4>Discount</h4>
                                        <h5 className="discount">{data.discount}</h5>
                                    </div>
                                    <div className="sub-summ-cont sub-summ-cont-discount">
                                        <h4>Shipping Price</h4>
                                        <h5>{data.delivery}</h5>
                                    </div>
                                    <div className="sub-summ-cont total">
                                        <h4>Total Price</h4>
                                        <h5>{data.grand_total}</h5>

                                    </div>
                                </div>
                            </div>
                            {
                                data.status == "placed" || data.status == "confirmed" ?
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <button className="cancel-order-btn" >Cancel Order</button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure you want to cancel this order?</AlertDialogTitle>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter className={"flex flex-col-reverse sm:flex-row sm:justify-center sm:space-x-2"}>
                                                <AlertDialogCancel className="mt-2 sm:mt-0">Keep Order</AlertDialogCancel>
                                                <AlertDialogAction className="mt-2 sm:mt-0 bg-[#EB0017]" onClick={() => {  }}>Cancel Order</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    : null
                            }
                            {
                                data.status == "delivered" && data.can_return ?
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <button className="cancel-order-btn" >Return Order</button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure you want to return this order?</AlertDialogTitle>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter className={"flex flex-col-reverse sm:flex-row sm:justify-center sm:space-x-2"}>
                                                <AlertDialogCancel className="mt-2 sm:mt-0">Keep Order</AlertDialogCancel>
                                                <AlertDialogAction className="mt-2 sm:mt-0 bg-[#EB0017]" onClick={() => { handleCancel(data.id) }}>Cancel Order</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    : null
                            }
                        </div>
                    </div>
            }
        </>
    );
}
