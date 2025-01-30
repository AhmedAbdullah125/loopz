'use client'
import React from 'react';
import CartBreadCramp from '../cart/CartBreadCramp';
import parse from 'html-react-parser';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';
import { useState, useEffect } from 'react';
import Loading from '@/app/loading';

export default function About() {
const [loading, setLoading] = useState(true);
const [data, setData] = useState([]);
const [token, setToken] = useState(localStorage.getItem('token'))
useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);
    if (!savedToken) {
        router.push('/login');
    }
    setLoading(true)
    const getData = async () => {
        try {
            const response = await axios.get(API_BASE_URL + `/settings`, {
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
    getData();
}, []);
console.log(data.about_us);


    return (
        <div className='about-page'> {/* Wrapper for the entire cart page */}
            {
                loading ? <Loading /> :
                    <div className="container"> {/* Container to center and structure the content */}
                        <CartBreadCramp title={'About'} titleUrl={'/about'} subtitle={''} subtitleUrl={''} />
                        <div className="cont-wrapper">
                            {parse(data.about_us)}
                        </div>
                    </div>
            }
        </div>
    );
}
