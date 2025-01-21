'use client';
import React, { useState, useEffect } from "react";

export const CounterContext = React.createContext(0);

export function CounterProvider({ children }) {
    const [cartCont, setCartCont] = useState([]); // Initial empty state
    const [hasMounted, setHasMounted] = useState(false); // Track hydration status

    useEffect(() => {
        
        setHasMounted(true); // Indicate the component has mounted
        try {
            const storedCart = localStorage.getItem('cart');
            if (storedCart) {
                setCartCont(JSON.parse(storedCart));
            }
        } catch (error) {
            console.error("Failed to parse cart data from localStorage:", error);
        }
    }, []); // Runs only once after mount

    function cartHandling(product) {
        setCartCont(product);
        try {
            localStorage.setItem('cart', JSON.stringify(product));
        } catch (error) {
            console.error("Failed to save cart data to localStorage:", error);
        }
    }

    // Prevent rendering children until hydration is complete
    if (!hasMounted) {
        return null; // Avoid rendering mismatched HTML during SSR
    }

    return (
        <CounterContext.Provider value={{ cartCont, cartHandling }}>
            {children}
        </CounterContext.Provider>
    );
}
