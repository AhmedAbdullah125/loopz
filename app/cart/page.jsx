import React from 'react';
// Importing components for the cart page
import CartBreadCramp from '../components/cart/CartBreadCramp'; // Breadcrumb component for navigation and title display
import CartBody from '../components/cart/CartBody'; // Main body of the cart page that likely contains cart items and related functionalities

export default function Cart() {
  // let { cartCont, cartHandling } = useContext(CounterContext);

  return (
    <div className='cart-page'> {/* Wrapper for the entire cart page */}
      <div className="container"> {/* Container to center and structure the content */}
        {/* Breadcrumb component to display the current page and navigation */}
        <CartBreadCramp 
          title={'Cart'}           // Title of the breadcrumb
          titleUrl={'/cart'}       // URL for the title link (if clickable)
          subtitle={''}            // Subtitle (if applicable, empty in this case)
          subtitleUrl={''}         // URL for the subtitle (if applicable, empty in this case)
        />
        
        {/* Main body of the cart page */}
        <CartBody></CartBody> {/* Likely displays cart items, totals, and checkout options */}
      </div>
    </div>
  );
}
