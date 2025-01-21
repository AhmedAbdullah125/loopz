'use client'
import React, { use, useEffect } from 'react'
// import { CounterContext } from '@/app/Context/CounterContext';
import Image from 'next/image'
import logo from '../assets/loops.svg'
import { useRouter } from 'next/navigation';


export default function Profile() {
    
    const router = useRouter();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/login');
        }

    }, [])
    
    return (

        <div className="img-empty">
            <Image src={logo} alt='Loopz' className='logo-in-footer'></Image>
        </div>
    )
}
