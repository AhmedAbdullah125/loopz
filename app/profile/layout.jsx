'use client'
import React, { useEffect, useState } from 'react'
import SideData from '../components/profile/SideData'
export default function Profile({ children }) {

    return (
        <div className="profile">
            <div className="container">
                <div className="profile-cont">
                    <SideData />
                    <div className="profile-content">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
