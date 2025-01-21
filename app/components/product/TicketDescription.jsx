import React, { useState } from 'react'
import parse from 'html-react-parser';

export default function TicketDescription({ product }) {
   
    return (
        <div className="tick-description">
            <h2>Description</h2>
            <div className="desk-cont">
               {parse(product.description)}
            </div>
        </div>
    )
}