'use client'
import React from 'react'
import van from '../../../app/assets/van.svg'
import global from '../../../app/assets/global.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function UpperNavBar() {
    function openLangList() {
        document.getElementById("overlay").style.display = "block";
        document.getElementById("langs").style.display = "flex";
        document.getElementById("chevron").style.transform = 'rotate(180deg)';
    }
    function closeLangList() {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("langs").style.display = "none";
        document.getElementById("chevron").style.transform = 'rotate(0deg)';

    }
    return (
        <div className="container">
            <div className='upper'>
                <span className='welcomeSpan font14-400'>Welcome to loopz</span>
                <div className="right-side">
                    <Link href={'/profile/orders'} className="van">
                        <Image src={van} alt='Van' className='van-img'></Image>
                        <span className='track font14-400'>Track Your Order</span>
                    </Link>
                    <span className='font14-400'>|</span>
                    <div className="global" id='global' onClick={openLangList}>
                        <Image src={global} alt='global'></Image>
                        <span className='lang font14-400'>EN</span>
                        <i className="fa-solid fa-chevron-down" id='chevron'></i>
                        <div className="langs" id='langs' >
                            <Link href={"#"}>العربيه</Link>
                            <Link href={"#"}>English</Link>
                        </div>
                    </div>

                </div>
                <div className="overlay" id='overlay' onClick={closeLangList}></div>
            </div>
        </div>
    )
}
