'use client';

import { useContext, useEffect, useState } from 'react';
import 'react-phone-number-input/style.css';
import { useRouter } from 'next/navigation';
import { ProfileDataContext } from '@/app/Context/ProfileContext';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';
import Loading from '@/app/loading';
import marker from '../../assets/marker.svg';
import Image from 'next/image';
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
import { Button } from "@/components/ui/button"
import { deleteAddress } from './removeAddress';
import Link from 'next/link';
export default function Address() {


    const router = useRouter();
    let { data } = useContext(ProfileDataContext || null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [addresses, setAddesses] = useState(null);  // State to store fetched data
    const [error, setError] = useState(null); // State for error handling
    const [deletedAddress, setDeletedAddress] = useState([]);
    useEffect(() => {
        // Retrieve token from localStorage
        const savedToken = localStorage.getItem('token');
        setToken(savedToken);
        if (!savedToken) {
            router.push('/login');
        }
    }, []);
    useEffect(() => {
        const getAddresses = async () => {
            // if (!token) {
            //     router.push('/login');
            //     return; // Prevent further execution
            // }
            try {
                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/addresses`, {
                    headers: {
                        'Accept-Language': 'ar',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = response.data.data;
                setAddesses(data);
            } catch (error) {
                console.error('Error retrieving data:', error);
            } finally {
                setLoading(false); // Always executed
            }
        };

        getAddresses();
    }, []); // Include dependencies
    if (loading) {
        return <Loading />;
    }
    const handleDelete = (id) => {
        deleteAddress(setLoading, router, id, deletedAddress, setDeletedAddress);

    };

    return (
        <div className='edit-profile-cont'>
            <h3>My Addresses</h3>
            <div className='profile-r-side'>
                <div className="addresses">
                    {addresses?.map((address, index) => (
                        deletedAddress.includes(address.id) ? null :
                            <div className="address" key={index}>
                                <div className="address-det">
                                    <div className="img-cont">
                                        <Image src={marker} alt="van" className="img" />
                                    </div>
                                    <div className="text">
                                        <h3>{address.address}</h3>
                                        <h4>{address.street}</h4>
                                    </div>
                                </div>
                                <div className="add-opts">
                                    <Link href={`/profile/edit-address?id=${address.id}`} className='edit-address'><i className="fa-regular fa-pen-to-square"></i></Link>
                                    <p>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <i className="fa-regular fa-trash-can"></i>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure you want to delete this address?</AlertDialogTitle>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter className={"flex flex-col-reverse sm:flex-row sm:justify-center sm:space-x-2"}>
                                                    <AlertDialogCancel className="mt-2 sm:mt-0">Cancel</AlertDialogCancel>
                                                    <AlertDialogAction className="mt-2 sm:mt-0 bg-[#EB0017]" onClick={() => { handleDelete(address.id) }}>delete</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </p>

                                </div>
                            </div>



                    ))}
                </div>
                <Link href={'/profile/add-address'} className='add-new-address'>Add New Address</Link>
            </div>
        </div>
    );
}