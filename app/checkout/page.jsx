import React from 'react';
// Importing components used in the checkout page
import CartBreadCramp from '../components/cart/CartBreadCramp'; // Breadcrumb component for navigation and context
import CheckBody from '../components/checkout/CheckBody'; // Main body of the checkout page

export default function Checkout() {
  // let { cartCont, cartHandling } = useContext(CounterContext);

  return (
    <div className='cart-page'> {/* Wrapper for the entire checkout page */}
      <div className="container"> {/* Ensures consistent layout and central alignment */}
        
        {/* Breadcrumb component */}
        <CartBreadCramp 
          title={'Cart'}              // The parent title displayed in the breadcrumb
          titleUrl={'/cart'}          // URL link for the "Cart" breadcrumb
          subtitle={'Checkout'}       // The current page displayed in the breadcrumb
          subtitleUrl={'/checkout'}   // URL for the "Checkout" page breadcrumb
        />
        
        {/* Main body of the checkout page */}
        <CheckBody></CheckBody> {/* Likely contains forms for user details, payment methods, and order review */}
      </div>
    </div>
  );
}
