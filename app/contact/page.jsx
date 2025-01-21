'use client'
import React, { useEffect } from "react";
import CartBreadCramp from "../components/cart/CartBreadCramp";
import Link from "next/link";
import Feedback from "../components/contact/Feedback";
import { useRouter } from "next/navigation";

export default function Contact() {
    const router = useRouter();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/login');
        }

    }, [])
    return (
        <div className="contact">
            <div className="container">
                <CartBreadCramp title="Contact" titleUrl="/contact" subtitle="" subtitleUrl="" />
                <div className="contact-content">
                    <div className="icons">
                        <div className="cardian card-call">
                            <div className="iccont">
                                <i className="fa-solid fa-phone-volume"></i>
                            </div>
                            <h3>Call Us</h3>
                            <Link href={'tel:+96554369874'}>+965 54369874</Link>
                        </div>
                        <div className="cardian card-location1">
                            <div className="iccont">
                                <i className="fa-solid fa-location-dot"></i>
                            </div>
                            <h3>location 1</h3>
                            <p>89 Mall - Egaila</p>
                        </div>
                        <div className="cardian card-location2">
                            <div className="iccont">
                                <i className="fa-solid fa-location-dot"></i>
                            </div>
                            <h3>location 2</h3>
                            <p>Al Nakhla Mall - Doha</p>
                        </div>
                    </div>
                    <Feedback />
                </div>
            </div>
        </div>
    );
}
