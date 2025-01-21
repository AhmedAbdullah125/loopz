'use client'
import React, { useState } from 'react'
import img1 from '../../assets/products/features/1.svg'
import img2 from '../../assets/products/features/2.svg'
import img3 from '../../assets/products/features/3.svg'
import img4 from '../../assets/products/features/4.svg'
import img5 from '../../assets/products/features/5.svg'
import img6 from '../../assets/products/features/6.svg'
import Image from 'next/image'
export default function ToysTabs({ product }) {
    let tabs = [
        {
            id: 1, title: "Service Overview", feats:
                [
                    { status: "p" },
                    { data: product.description },
                ]
        }, {
            id: 2, title: "Vendor Policy"
            , feats:
                [
                    { status: "grid" },
                    {
                        data: [
                            { img: img1, q: "Setup time", a: product.setup_time },
                            { img: img2, q: "Dimension", a: product.dimension },
                            { img: img3, q: "Electric required", a: product.electric_required },
                            { img: img4, q: "Age", a: `+ ${product.age}` },
                            { img: img5, q: "Pickup time", a: product.pick_up_time },
                            { img: img6, q: "Session Duration", a: product.session_duration },
                        ]
                    },
                ]
        }, {
            id: 3, title: "Reviews", feats:
                [
                    { status: "Reviews" },

                ]
        }
    ]
    let [selectedTab, setSelectedTab] = useState("Service Overview")
    let [selectedIndex, setSelectedIndex] = useState(0)
    let [maxreviews, setMaxreviews] = useState(5)
    let [reviews, setReviews] = useState(product.reviews)
    let [miniReviews, setMiniReviews] = useState(reviews.slice(0, maxreviews))
    return (
        <div className="productFeatures">
            <div className="tabs" >
                {tabs.map((tab, index) =>
                    <div key={tab.id} className={`tab ${selectedTab == tab.title ? 'avtiveTab' : ""}`} onClick={() => {
                        setSelectedIndex(index);
                        setSelectedTab(tab.title);
                    }}>
                        <span>{tab.title}</span>
                    </div>
                )}
            </div>
            <div className="data">
                {tabs[selectedIndex].feats[0].status == "p" ?
                    <p className='dataP'>{tabs[selectedIndex].feats[1].data}</p>
                    : tabs[selectedIndex].feats[0].status == "grid" ?
                        <div className="grid-cont">
                            {product.features.map((ele, index) =>
                                <div className="feature" key={index}>
                                    <div className="question">
                                        {/* <Image src={ele.img} alt='loopz'></Image> */}
                                        <p className='questionP'>{ele.key}</p>
                                    </div>
                                    <p className='answar'>{ele.value}</p>
                                </div>
                            )}
                        </div>
                        : tabs[selectedIndex].feats[0].status == "Reviews" ?
                            <div className="product-review">
                                <div className="rate main-rate">
                                    <div className="stars">
                                        <i className={`${product.rate >= 1 ? "goldenStar" : "grayStar"} fa-solid fa-star`} ></i>
                                        <i className={`${product.rate >= 2 ? "goldenStar" : "grayStar"} fa-solid fa-star`} ></i>
                                        <i className={`${product.rate >= 3 ? "goldenStar" : "grayStar"} fa-solid fa-star`} ></i>
                                        <i className={`${product.rate >= 4 ? "goldenStar" : "grayStar"} fa-solid fa-star`} ></i>
                                        <i className={`${product.rate >= 5 ? "goldenStar" : "grayStar"} fa-solid fa-star`} ></i>
                                    </div>
                                    <p> ( based on {product.total_reviews} reviews ) </p>
                                </div>
                                {
                                    miniReviews.map((ele, index) =>
                                        <div className="review" key={index}>

                                            <div className="head">
                                                <div className="img-cont">
                                                    <Image src={ele.user.image} alt='loopz' width={50} height={50}></Image>
                                                </div>
                                                <div className="user-data">
                                                    <p className='name'>{ele.user.name}</p>
                                                    <div className="rate">
                                                        <div className="stars">
                                                            <i className={`${ele.rate >= 1 ? "goldenStar" : "grayStar"} fa-solid fa-star`} ></i>
                                                            <i className={`${ele.rate >= 2 ? "goldenStar" : "grayStar"} fa-solid fa-star`} ></i>
                                                            <i className={`${ele.rate >= 3 ? "goldenStar" : "grayStar"} fa-solid fa-star`} ></i>
                                                            <i className={`${ele.rate >= 4 ? "goldenStar" : "grayStar"} fa-solid fa-star`} ></i>
                                                            <i className={`${ele.rate >= 5 ? "goldenStar" : "grayStar"} fa-solid fa-star`} ></i>
                                                        </div>
                                                        <p><span>|</span> <span>{ele.date}</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="body">
                                                <p className='comment'>{ele.comment}</p>
                                            </div>
                                        </div>
                                    )
                                }
                                <div className="View-More" onClick={() => { setMiniReviews( reviews ) }} style={{ display: miniReviews.length == reviews.length ? "none" : "flex" }}><span>View More</span><i className="fa-solid fa-arrow-right-long"></i></div>
                            </div>
                            : ""
                }
            </div>
        </div>
    )
}