'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/apiConfig";
import DatePicker from 'react-datepicker';
import Loading from "@/app/loading";
import calenderIcon from '../../assets/calenderIcon.svg'
import Image from "next/image";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogDescription
} from "@/components/ui/alert-dialog"
import { toast } from "sonner";
import { addToWallet } from "./addToWallet";

export default function TicketList() {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [listMax, setListMax] = useState(3);
    const [ListData, setListData] = useState([]);
    let ListDataCopy = [...ListData.slice(0, listMax)];
    const[amount, setAmount] = useState(0)
    const [startDate, setStartDate] = useState(() => {
        const lastYear = new Date();
        lastYear.setFullYear(lastYear.getFullYear() - 1); // Set the year to last year
        return lastYear;
    }); const [endDate, setEndDate] = useState(new Date());
    const formatDate = (date) => {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };

    // Example Usage:


    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        setToken(savedToken);
        if (!savedToken) {
            router.push('/login');
        }

        setLoading(true)
        const getTickets = async () => {
            try {

                const responseList = await axios.get(API_BASE_URL + `/wallet?date_from=${formatDate(startDate)}&date_to=${formatDate(endDate)}`, {
                    headers: {
                        'Accept-Language': 'en',
                        Authorization: `Bearer ${token}`,
                    },
                });
                let data = responseList.data.data;

                setData(data)

                setLoading(false)
            } catch (error) {
                console.error('Error retrieving data:', error);
                throw new Error('Could not get data');
                setLoading(false)
            }
        };
        getTickets();
    }, [startDate, endDate]);
    
    const handleAddToWallet = (id) => {
        addToWallet(setLoading, amount);
    };
    return (
        <div className="edit-profile-cont">
            <div className="flex items-center justify-between">
                <h3>Wallet Transactions</h3>
                <div className="dates">
                    <label htmlFor="startdate">
                        <div className="calender-icon-cont">
                            <Image src={calenderIcon} alt="calender" className="calender-icon" />
                        </div>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} id="startdate" />
                    </label>
                    <i className="fa-solid fa-chevron-right"></i>
                    <label htmlFor="enddate">
                        <div className="calender-icon-cont">
                            <Image src={calenderIcon} alt="calender" className="calender-icon" />
                        </div>
                        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} id="enddate" />
                    </label>
                </div>
            </div>

            <div className="profile-r-side">

                {
                    loading ? <Loading /> :
                        <div className="transctios-cont">
                            {
                                data.map((item, index) =>
                                    <div className={`transaction-cont ${Number(item.amount) > 0 ? 'green' : 'red'}`} key={index}>
                                        <div className="sympol">
                                            <i className="fa-solid fa-arrow-up"></i>
                                        </div>
                                        <div className="trx-details">
                                            <h3>{item.description}</h3>
                                            <h4>{item.amount}</h4>
                                            <p> <i className="fa-regular fa-calendar-days"></i> <span>{item.date}</span></p>
                                        </div>

                                    </div>
                                )
                            }
                        </div>
                }
            </div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <button className="add-to-wallet-btn" >Add To Wallet</button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Add To Wallet</AlertDialogTitle>
                        <AlertDialogDescription>
                            <div className="add-to-wallet-form">
                                <label htmlFor="amount">Amount</label>
                                <input onChange={(e) => { setAmount(e.target.value) }} maxLength={3} type="text" name="amount" id="amount" onKeyDown={(e) => {

                                    if (e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4' || e.key === '5' || e.key === '6' || e.key === '7' || e.key === '8' || e.key === '9' || e.key === '0' || e.key === 'Backspace' || e.key === 'Delete') {   // Allow digits (0-9)
                                        return true;
                                    } else {
                                        e.preventDefault(); // Prevent non-digit input
                                        toast.error('Invalid input. Only digits are allowed.');
                                    }
                                }} />
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className={"flex flex-col-reverse sm:flex-row sm:justify-center sm:space-x-2"}>
                        <AlertDialogCancel className="mt-2 sm:mt-0">cancel</AlertDialogCancel>
                        <AlertDialogAction className="mt-2 sm:mt-0 bg-[#53AA00]" onClick={() => { handleAddToWallet(amount) }}>Add To Wallet</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>

    );
}
