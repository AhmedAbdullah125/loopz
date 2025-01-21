'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import cube from '../../assets/Home/cube.png'
import Rentals from '../../assets/Home/Rentals.svg'
import Tickets from '../../assets/Home/Tickets.svg'
import axios from 'axios'
import HomeToys from './HomeToys'
import HomeRentals from './HomtRentals'
import HomeTickets from './HomeTickets'
import Loading from '@/app/loading'

export default function HomeContent() {
    let [selectedTab, setSelectedTab] = useState('Toys');
    let [selectedIndex, setSelectedIndex] = useState(0);
    let [bookmarks, setBookmarks] = useState([]); //bookMarks array
    let secBookmark = [];
    let products = [  { id: "01", title: "Toys", img: cube }, { id: "02", title: "Rentals", img: Rentals }, { id: "03", title: "Tickets", img: Tickets  }]
    const [toys, setToys] = useState(null);  // State to store fetched data
    const [rentals, setRentals] = useState(null);  // State to store fetched data
    const [tickets, setTeckets] = useState(null);  // State to store fetched data
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [data, setData] = useState(null);  // State to store fetched data
    const [error, setError] = useState(null); // State for error handling


    useEffect(() => {
        setLoading(true)
        const getHomeData = async () => {
            try {
                const toysResponse = await axios.get("https://loopz-q8.com/api/toys-home");
                let toys = toysResponse.data.data;
                const rentalResponse = await axios.get("https://loopz-q8.com/api/products-home");
                let rentals = rentalResponse.data.data;
                const ticketsResponse = await axios.get("https://loopz-q8.com/api/tickets-home");
                let tickets = ticketsResponse.data.data;
                setToys(toys)
                setRentals(rentals)
                setTeckets(tickets)
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
                : selectedIndex == 2 ?
                <HomeTickets tickets={tickets} />
                : null
            }
        </div>
    )
}
