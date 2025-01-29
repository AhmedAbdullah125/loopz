import React from 'react';
// Importing components used in the checkout page
import CartBreadCramp from '../components/cart/CartBreadCramp'; // Breadcrumb component for navigation and context
import RentalCheckBody from '../components/checkout/RentalCheckBody';

export default function Checkout() {
  // let { cartCont, cartHandling } = useContext(CounterContext);
 
  return (
    <div className='cart-page'> {/* Wrapper for the entire checkout page */}
      <div className="container"> {/* Ensures consistent layout and central alignment */}
        
        {/* Breadcrumb component */}
        <CartBreadCramp 
          title={'Checkout'}              // The parent title displayed in the breadcrumb
          titleUrl={'/rentalcheckout'} 
          subtitle={''}            // Subtitle (if applicable, empty in this case)
          subtitleUrl={''}                // URL link for the "Cart" breadcrumb 
        />
        
        {/* Main body of the checkout page */}
        {/* Likely contains forms for user details, payment methods, and order review */}
        <RentalCheckBody></RentalCheckBody> 

      </div>
    </div>
  );
}
