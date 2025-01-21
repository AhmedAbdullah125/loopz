'use client'
import React, { useEffect, useState } from 'react';
import Login from '../components/auth/Login';
import Verfiy from '../components/auth/Verfiy';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [step, setStep] = useState('login')
    const [phone, setPhone] = useState(null)
    const router = useRouter();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.back();
        }
    }, [])
    return (
        <>
            {
                step === 'login'? <Login step={step} setStep={setStep} setPhone={setPhone} />:
                step === 'verify' ? <Verfiy step={step} setStep={setStep} phone={phone} />:
                <p>Not a valid step</p>
        }
        </>

    );
}
