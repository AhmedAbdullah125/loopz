'use client'
import Link from 'next/link'
import React, { useState } from 'react'
export default function CartBreadCramp({ title, titleUrl, subtitle, subtitleUrl }) {

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    // Freecodecamp
    return (
        <div className="">
            <div className="bead-cramp">
                <p className='breadLink'><Link href={'/'}>Home</Link> - <Link href={titleUrl}>{title}</Link> {subtitle == "" ? null : <>- <Link href={subtitleUrl}>{subtitle}</Link></>}</p>
            </div>
        </div>
    )
}