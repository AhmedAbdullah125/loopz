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
import wallet from '../../assets/profile/wallet.png';
import card from '../../assets/profile/card.svg';
import cash from '../../assets/profile/cash.avif';


export default function TicketList() {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [listMax, setListMax] = useState(3);
    const [ListData, setListData] = useState([]);
    let ListDataCopy = [...ListData.slice(0, listMax)];


    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        setToken(savedToken);
        if (!savedToken) {
            router.push('/login');
        }

        setLoading(true)
        const getTickets = async () => {
            try {

                const responseList = await axios.get(API_BASE_URL + '/bookings', {
                    headers: {
                        'Accept-Language': 'en',
                        Authorization: `Bearer ${token}`,
                    },
                });
                let data = responseList.data.data;

                setListData(data)

                setLoading(false)
            } catch (error) {
                console.error('Error retrieving data:', error);
                throw new Error('Could not get data');
                setLoading(false)
            }
        };
        getTickets();
    }, [])
    console.log(ListData);

    return (
        <>
            {
                loading ? <Loading /> :

                    <div className="edit-profile-cont">
                        <h3>Bookings List</h3>

                        <div className="profile-r-side">

                            <div className="tab-content-tickets">
                                {
                                    ListData.length > 0 ?
                                        ListDataCopy?.map((item) =>



                                            <AlertDialog key={item.id} className="relative">
                                                <AlertDialogTrigger asChild>
                                                    <div className="ticket-cont ticket-cont-list" key={item.id}>
                                                        <div className="l-side">
                                                            <div className="img-cont-small">
                                                                <Image src={item.main_ticket.ticket.image} width={100} height={100} alt="Loops" className="img-of-ticket" />
                                                            </div>
                                                            <div className="text-cont">
                                                                <h3>{item.main_ticket.uuid}</h3>
                                                                <h4>{item.quantity} Tickets</h4>
                                                                <h5>Ticket Name : <span>{item.main_ticket.ticket.name}</span></h5>
                                                                <h5>Total Price : <span className="heavy">{item.grand_total} K.D</span></h5>
                                                            </div>
                                                        </div>
                                                        <div className="r-side">
                                                            <span>{item.created}</span>
                                                            {/* <h3 className={item.status}>{item.status === "expired" ? "Expired" : item.status == "valid" ? "Valid" : "Used"}</h3> */}
                                                        </div>
                                                    </div>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className="sm:rounded-[44px] rounded-[20px]">
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            <div className="dialog-cont-in-ticket">
                                                                <h3 className="dialog-number">{item.main_ticket.uuid}</h3>
                                                                <span className="date-publish">Booked {item.date}</span>
                                                                <div className="more-details">
                                                                    <div className="img-cont">
                                                                        <Image src={item.main_ticket.ticket.image} width={100} height={100} alt="Loops" className="img-of-ticket" />
                                                                    </div>
                                                                    <div className="text">
                                                                        <h2>{item.main_ticket.ticket.name}</h2>
                                                                        <h4>{item.main_ticket.ticket.text}</h4>
                                                                        <div className="det-status">
                                                                            <div className="det">
                                                                                <h5>{item.main_ticket.ticket.persons} persons</h5>
                                                                                <h6>{item.grand_total} K.D</h6>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="related-text">
                                                                    <h3>Tickets Booked ( {item.tickets.length} )</h3>
                                                                    <div className="flex flex-col gap-3">
                                                                    {
                                                                        item.tickets.length > 0 ?
                                                                            item.tickets.map((subTicket) => (
                                                                                <div className="sub-ticket-cont" key={subTicket.id}>
                                                                                    <div className="img-cont-small">
                                                                                        <Image src={subTicket.ticket.image} width={100} height={100} alt="Loops" className="img-of-ticket" />
                                                                                    </div>
                                                                                    <div className="text-cont">
                                                                                        <h5>No. {subTicket.uuid}</h5>
                                                                                    </div>
                                                                                </div>
                                                                            ))
                                                                            :
                                                                            null
                                                                    }
                                                                    </div>
                                                                </div>
                                                                <div className="related-text pay-method">
                                                                    <h3>Payment Method</h3>
                                                                    <div className="sub-ticket-cont">
                                                                        <div className="img-cont-small">
                                                                            {
                                                                                item.payment_method_text == "card" ?
                                                                                    <Image src={card} width={100} height={100} alt="Loops" className="img-of-ticket" />
                                                                                    : item.payment_method_text == "cash" ?
                                                                                        <Image src={cash} width={100} height={100} alt="Loops" className="img-of-ticket" />
                                                                                        : item.payment_method_text == "wallet" ?
                                                                                            <Image src={wallet} width={100} height={100} alt="Loops" className="img-of-ticket" />
                                                                                            :null 
                                                                            }
                                                                        </div>
                                                                        <div className="text-cont">
                                                                            <h5>{item.payment_method_text}</h5>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div className="summary">
                                                                    <h3>Price Summary</h3>
                                                                    <div className="summ-cont">
                                                                        <div className="sub-summ-cont">
                                                                            <h4>Total Items</h4>
                                                                            <h5>{item.sub_total}</h5>
                                                                        </div>
                                                                        <div className="sub-summ-cont">
                                                                            <h4>Total VAT</h4>
                                                                            <h5>{item.total_vat}</h5>
                                                                        </div>
                                                                        <div className="sub-summ-cont sub-summ-cont-discount ">
                                                                            <h4>Discount</h4>
                                                                            <h5 className="discount">{item.discount}</h5>
                                                                        </div>
                                                                        <div className="sub-summ-cont total">
                                                                            <h4>Total Price</h4>
                                                                            <h5>{item.grand_total}</h5>
                                                                            
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </AlertDialogTitle>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter className={"flex flex-col-reverse sm:flex-row sm:justify-center sm:space-x-2 close-download-cont"}>
                                                        <AlertDialogCancel className="mt-2 sm:mt-0 p-0 border-none outline-none shadow-none bg-transparent close-dialog top-5 end-5" ><i className="fa-solid fa-xmark"></i></AlertDialogCancel>
                                                        {/* <AlertDialogAction className="mt-2 sm:mt-0 bg-[#7a3abf] w-full text-lg  font-bold p-3 flex items-center justify-center h-12" onClick={() => { handleDelete(address.id) }}>Download</AlertDialogAction> */}
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>


                                        )
                                        :
                                        <p className='empty'>No Tickets</p>
                                }
                                {
                                    ListData.length > ListDataCopy.length ?
                                        <button onClick={() => {
                                            setListMax(ListData.length)
                                        }}>See All</button> : null
                                }

                            </div>
                        </div>

                    </div>

            }
        </>
    );
}
