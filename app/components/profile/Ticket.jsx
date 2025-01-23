'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { API_BASE_URL } from "@/lib/apiConfig";
import axios from "axios";
import Loading from "@/app/loading";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function Ticket() {
    const tabs = [{ id: 1, title: "Valid" }, { id: 2, title: "Expired" }];
    const [selectedTab, setSelectedTab] = useState(tabs[0].title);
    const [selectedIndex, setSelectedIndex] = useState(tabs[0].id);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [neededData, setNeededData] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [max, setMax] = useState(3);
    let neededDataCopy = [...neededData.slice(0, max)];


    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        setToken(savedToken);
        if (!savedToken) {
            router.push('/login');
        }

        setLoading(true)
        const getTickets = async () => {
            try {
                const response = await axios.get(API_BASE_URL + '/my-tickets', {
                    headers: {
                        'Accept-Language': 'en',
                        Authorization: `Bearer ${token}`,
                    },
                });
                let data = response.data.data;
                setData(data)
                setNeededData(data.valid_tickets)
                setLoading(false)
            } catch (error) {
                console.error('Error retrieving data:', error);
                throw new Error('Could not get data');
                setLoading(false)
            }
        };
        getTickets();
    }, [])
    return (
        <>
            {
                loading ? <Loading /> :
                        <div className="edit-profile-cont">
                            <h3>My Tickets</h3>

                            <div className="profile-r-side">
                                <div className="tabs" >
                                    {tabs.map((tab, index) =>
                                        <div key={tab.id} className={`tab ${selectedTab == tab.title ? 'avtiveTab' : ""}`} onClick={() => {
                                            setSelectedIndex(tab.id);
                                            setSelectedTab(tab.title);
                                            if (tab.id == 1) {
                                                setNeededData(data.valid_tickets)
                                            }
                                            if (tab.id == 2) {
                                                setNeededData(data.expired_tickets)
                                            }

                                        }}>
                                            <span>{tab.title}</span>
                                        </div>
                                    )}

                                </div>
                                <div className="tab-content-tickets">
                                    {
                                        neededData.length > 0 ?

                                            neededDataCopy?.map((item, index) =>
                                                <AlertDialog key={item.id} className="relative">
                                                    <AlertDialogTrigger asChild>
                                                        <div className="ticket-cont">
                                                            <div className="l-side">
                                                                <div className="img-cont">
                                                                    <Image src={item.ticket.image} width={100} height={100} alt="Loops" className="img-of-ticket" />
                                                                </div>
                                                                <div className="text-cont">
                                                                    <h3>{item.ticket.name}</h3>
                                                                    <p>{item.price} K.D</p>
                                                                    <span>No.{item.uuid}</span>
                                                                </div>
                                                            </div>
                                                            <div className="r-side">
                                                                <span>{item.created}</span>
                                                                <h3 className={`ticket-status ${item.status}`}>{item.status === "expired" ? "Expired" : item.status == "valid" ? "Valid" : "Used"}</h3>
                                                            </div>
                                                        </div>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent className="sm:rounded-[44px] rounded-[20px] ">
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                                <div className="dialog-cont-in-ticket">
                                                                    <h3 className="dialog-number">No. {item.uuid}</h3>
                                                                    <span className="date-publish">Purchased on {item.date}</span>
                                                                    <div className="more-details">
                                                                        <div className="img-cont">
                                                                            <Image src={item.ticket.image} width={100} height={100} alt="Loops" className="img-of-ticket" />
                                                                        </div>
                                                                        <div className="text">
                                                                            <h2>{item.ticket.name}</h2>
                                                                            <h4>{item.ticket.text}</h4>
                                                                            <div className="det-status">
                                                                                <div className="det">
                                                                                    <h5>{item.ticket.persons} persons</h5>
                                                                                    <h6>{item.price} K.D</h6>
                                                                                </div>
                                                                                <h3 className={`ticket-status ${item.status}`}>{item.status === "expired" ? "Expired" : item.status == "valid" ? "Valid" : "Used"}</h3>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="expire">
                                                                        <span className="exp">Expires on {item.ticket.expire_in}</span>
                                                                    </div>
                                                                    <div className="qr-cont">
                                                                        <Image src={item.qr_code} width={100} height={100} alt="Loops" className="img-of-ticket" />
                                                                    </div>
                                                                </div>
                                                            </AlertDialogTitle>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter className={"flex flex-col-reverse sm:flex-row sm:justify-center sm:space-x-2 close-download-cont mb-2"}>
                                                            <AlertDialogCancel className="mt-2 sm:mt-0 p-0 border-none outline-none shadow-none bg-transparent close-dialog top-5 end-5" ><i className="fa-solid fa-xmark"></i></AlertDialogCancel>
                                                            <AlertDialogAction className="mt-2 sm:mt-0 bg-[#7a3abf] w-full text-lg  font-bold p-3 flex items-center justify-center h-12" onClick={() => { handleDelete(address.id) }}>Download</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            )
                                            :
                                            <p className='empty'>No Tickets</p>
                                    }
                                    {
                                        neededData.length > neededDataCopy.length ?
                                            <button onClick={() => {
                                                setMax(neededData.length)
                                            }}>See All</button> : null
                                    }

                                </div>
                            </div>

                        </div>
                       
            }
        </>
    );
}
