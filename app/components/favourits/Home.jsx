'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import cube from '../../assets/Home/cube.png'
import Rentals from '../../assets/Home/Rentals.svg'
import axios from 'axios'
import HomeToys from './HomeToys'
import HomeRentals from './HomtRentals'
import Loading from '@/app/loading'
import { API_BASE_URL } from '@/lib/apiConfig'

export default function HomeContent() {
    let [selectedTab, setSelectedTab] = useState('Toys');
    let [selectedIndex, setSelectedIndex] = useState(0);
    let products = [{ id: "01", title: "Toys", img: cube }, { id: "02", title: "Rentals", img: Rentals }]
    const [toys, setToys] = useState(null);  // State to store fetched data
    const [rentals, setRentals] = useState(null);  // State to store fetched data
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [token, setToken] = useState(localStorage.getItem('token'));
    useEffect(() => {
        // Retrieve token from localStorage
        const savedToken = localStorage.getItem('token');
        setToken(savedToken);
    }, []);

    useEffect(() => {
        setLoading(true)
        const getHomeData = async () => {
            try {
                const toysResponse = await axios.get(`${API_BASE_URL}/favorites-toys`, {
                    headers: {
                        'Accept-Language': 'en',
                        Authorization: `Bearer ${token}`,
                    },
                });
                let toys = toysResponse.data.data;
                const rentalResponse = await axios.get(`${API_BASE_URL}/favorites-products`, {
                    headers: {
                        'Accept-Language': 'en',
                        Authorization: `Bearer ${token}`,
                    },
                });
                let rentals = rentalResponse.data.data;               
                setToys(toys)
                setRentals(rentals)
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
        <div className='container HomeContentHeader'>
            <div className="tabs" >
                {products.map((product, index) =>
                    <div key={product.id} className={`tab ${selectedTab == product.title ? 'avtiveTab' : ""}`} onClick={() => {
                        setSelectedIndex(index);
                        setSelectedTab(product.title);

                    }}>
                        <Image className='' alt='loopz' src={product.img}></Image>
                        <span>{product.title}</span>
                    </div>
                )}
            </div>
            {loading ? <Loading /> :
                selectedIndex == 0 ?
                    <HomeToys toys={toys} />
                    : selectedIndex == 1 ?
                        <HomeRentals rentals={rentals} />
                        
                            : null
            }
        </div>
    )
}
