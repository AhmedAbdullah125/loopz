'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import ProducrSwiper from './ProducrSwiper'
import ProductDetails from './ProductDetails'
export default function ProductDataWrapper(data) {
    let [product, setProduct] = useState(data.product);
    let [title, setTitle] = useState(data.title);
    return (
        <div className=" ProductDataWrapper row">
            <ProducrSwiper  product={product}/>
            <ProductDetails product={product} title={title}/>
            
        </div>
    )
}