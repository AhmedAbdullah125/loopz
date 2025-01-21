import Image from 'next/image'
import React from 'react'
import logo from '../../assets/loops.svg'
import inst from '../../assets/footer/inst.png'
import yout from '../../assets/footer/yout.svg'
import tik from '../../assets/footer/tik.png'
import apple from '../../assets/footer/Apple.svg'
import playStore from '../../assets/footer/play.svg'
// import raiyan from '../../assets/home/raiyan.png'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='footer'>
      <div className="mainFooter">
        <div className="container">
          <div className="cols-cont">
            <div className="colmn">
              <Image src={logo} alt='Loopz' className='logo-in-footer'></Image>
              <p className='discription'>
                Our play center and cafe are an excellent opportunity for the entire family to have a great time with many benefits!
              </p>
              <div className="social">
                <Link href={''}><Image className='social-img' alt='Loopz' src={inst}></Image></Link>
                <Link href={''}><Image className='social-img' alt='Loopz' src={yout}></Image></Link>
                <Link href={''}><Image className='social-img' alt='Loopz' src={tik}></Image></Link>
              </div>
            </div>
            <div className="colmn">
              <h3 className='col-title'>Top Categories</h3>
              <Link href={''} className="col-item">Toys</Link>
              <Link href={''} className="col-item">Rentals</Link>
              <Link href={''} className="col-item">Tickets</Link>
            </div>
            <div className="colmn">
              <h3 className='col-title'>Quick Links</h3>
              <Link href={''} className="col-item">Cart</Link>
              <Link href={''} className="col-item">Track Your Order</Link>
              <Link href={''} className="col-item">My Tickets</Link>
            </div>
            <div className="colmn">
              <h3 className='col-title'>Quick Links</h3>
              <Link href={''} className="col-item">About Loopz</Link>
              <Link href={''} className="col-item">Contact Us</Link>
              <Link href={''} className="col-item">Terms & Privacy Policy</Link>
            </div>
            <div className="colmn">
              <h3 className='col-title'>Contact</h3>
              <Link className='contact-item' href="tel:+9655435907">
                <i className="fa-solid fa-phone-volume"></i>
                <span>+ 965 5435907</span>
              </Link>
              <Link className='contact-item' href="mailto:info@bookloopz.com">
                <i className="fa-solid fa-envelope"></i>
                <span>info@bookloopz.com</span>
              </Link>
              <div className='contact-item' href="info@bookloopz.com">
                <i className="fa-solid fa-location-dot"></i>
                <span>89 Mall - Egaila Al Nakhla Mall - Doha</span>
              </div>

            </div>
            <div className="colmn">
              <h3 className='col-title'>Try App</h3>
              <Link className='app-item' href="">
                <Image src={apple} alt='loopz'></Image>
              </Link>
              <Link className='app-item' href="">
                <Image src={playStore} alt='loopz' ></Image>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-footer">
        <div className="container bottom-cont">
          <span></span>
          <span className='copy'>© Copyright 2024 By Loopz</span>
          <div className="raiyan">
            <span>Developed By</span>
            {/* <Image src={raiyan} alt='loopz'></Image> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
