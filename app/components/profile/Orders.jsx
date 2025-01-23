'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { API_BASE_URL } from "@/lib/apiConfig";
import axios from "axios";
import Loading from "@/app/loading";
import box from '../../assets/profile/orders.svg';
import Link from "next/link";

export default function Orders() {
    const tabs = [{ id: 1, title: "Toys" }, { id: 2, title: "Rentals" }];
    const [selectedTab, setSelectedTab] = useState(tabs[0].title);
    const [selectedIndex, setSelectedIndex] = useState(tabs[0].id);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [rentals, setRentals] = useState([]);
    const [neededData, setNeededData] = useState([]);
    const [lastOrders, setLastOrders] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [max, setMax] = useState(3);
    const [maxLast, setMaxLast] = useState(3);
    let neededDataCopy = [...neededData.slice(0, max)];
    let lastOrdersCopy = [...lastOrders.slice(0, maxLast)];
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        setToken(savedToken);
        if (!savedToken) {
            router.push('/login');
        }

        setLoading(true)
        const getTickets = async () => {
            try {
                const response = await axios.get(API_BASE_URL + '/orders', {
                    headers: {
                        'Accept-Language': 'en',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const responseRentals = await axios.get(API_BASE_URL + '/rentals', {
                    headers: {
                        'Accept-Language': 'en',
                        Authorization: `Bearer ${token}`,
                    },
                });
                let data = response.data.data;
                let rentals = responseRentals.data.data
                setData(data)
                setRentals(rentals)
                setNeededData(data.current_orders)
                setLastOrders(data.last_orders)
                setLoading(false)
            } catch (error) {
                console.error('Error retrieving data:', error);
                throw new Error('Could not get data');
                setLoading(false)
            }
        };
        getTickets();
    }, []);
    
    return (
        <>
            {
                loading ? <Loading /> :
                    <div className="edit-profile-cont profile-orders">
                        <h3>My Orders</h3>
                        <div className="profile-r-side">
                            <div className="tabs" >
                                {tabs.map((tab, index) =>
                                    <div key={tab.id} className={`tab ${selectedTab == tab.title ? 'avtiveTab' : ""}`} onClick={() => {
                                        setSelectedIndex(tab.id);
                                        setSelectedTab(tab.title);
                                        setMax(3);
                                        setMaxLast(3);
                                        if (tab.id == 1) {
                                            setNeededData(data.current_orders)
                                            setLastOrders(data.last_orders)
                                        }
                                        if (tab.id == 2) {
                                            setNeededData(rentals.current_rentals)
                                            setLastOrders(rentals.last_rentals)

                                        }
                                    }}>
                                        <span>{tab.title}</span>
                                    </div>
                                )}

                            </div>
                            <h3 className="tab-title">Current Orders</h3>
                            <div className="tab-content-tickets">

                                {
                                    neededDataCopy.map((item, index) =>
                                        <Link href={`${selectedIndex == 1 ?`/profile/order?id=${item.id}`:`/profile/rental?id=${item.id}`}`} className="ticket-cont ticket-cont-list" key={item.id}>
                                            <div className="l-side">
                                                <div className="img-cont-small">
                                                    <Image src={box} width={100} height={100} alt="Loops" className="img-of-ticket" />
                                                </div>
                                                <div className="text-cont">
                                                    <h3># {item.id}</h3>
                                                    {
                                                        selectedIndex == 1 ? <h4>{item.order_items_count} itmes</h4> : selectedIndex == 2 ? <h4>{item.quantity} itmes</h4> : null
                                                    }
                                                    <h5>Total Price : <span className="heavy">{item.grand_total} K.D</span></h5>
                                                    <h6 className={`${item.status_text} status`}>{item.status_text}</h6>
                                                </div>
                                            </div>
                                            <div className="r-side">
                                                <span>{item.created}</span>
                                            </div>
                                        </Link>
                                    )
                                }
                                {
                                    neededData.length > neededDataCopy.length ?
                                        <button onClick={() => {
                                            setMax(neededData.length)
                                        }}>See All</button> : null
                                }


                            </div>
                            <h3 className="tab-title">Last Orders</h3>
                            <div className="tab-content-tickets">

                                {
                                    lastOrdersCopy.map((item, index) =>
                                        <Link href={`${selectedIndex == 1 ?`/profile/order?id=${item.id}`:`/profile/rental?id=${item.id}`}`} className="ticket-cont ticket-cont-list" key={item.id}>
                                            <div className="l-side">
                                                <div className="img-cont-small">
                                                    <Image src={box} width={100} height={100} alt="Loops" className="img-of-ticket" />
                                                </div>
                                                <div className="text-cont">
                                                    <h3># {item.id}</h3>
                                                    {
                                                        selectedIndex == 1 ? <h4>{item.order_items_count} itmes</h4> : selectedIndex == 2 ? <h4>{item.quantity} itmes</h4> : null
                                                    }
                                                    <h5>Total Price : <span className="heavy">{item.grand_total} K.D</span></h5>
                                                    <h6 className={`${item.status_text} status`}>{item.status_text}</h6>
                                                </div>
                                            </div>
                                            <div className="r-side">
                                                <span>{item.created}</span>
                                            </div>
                                        </Link>
                                    )
                                }
                                {
                                    lastOrders.length > lastOrdersCopy.length ?
                                        <button onClick={() => {
                                            setMaxLast(lastOrders.length)
                                        }}>See All</button> : null
                                }


                            </div>
                        </div>

                    </div>


            }
        </>
    );
}
