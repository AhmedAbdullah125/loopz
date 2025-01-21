'use client'
import React, { useEffect, useState } from 'react'
import BreadCrampp from '../components/product/BreadCrampp'
import ProductDataWrapper from '../components/product/ProductDataWrapper'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import Loading from '../loading'
import TicketDescription from '../components/product/TicketDescription'

export default function Ticket() {
    const searchParams = useSearchParams()
    const [pathId, setPathId] = useState(searchParams.get('id'))
    let [product, setProduct] = useState([]);
    let [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true)
        const getHomeData = async () => {
            try {
                const productResponse = await axios.get(`https://loopz-q8.com/api/tickets/${pathId}`);
                let product = productResponse.data.data;
                setProduct(product)
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
        <div className="container ">
            {
                loading ? (
                    <Loading />
                ) : (
                    <>
                        <BreadCrampp data={product} title="Ticket" />
                        <ProductDataWrapper product={product}  title="Ticket"/>
                        {/* <ToysTabs product={product} /> */}
                        <TicketDescription  product={product}/>
                    </>
                )
            }
        </div>
    )
}