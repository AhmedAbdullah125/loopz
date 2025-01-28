'use client';
import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import van from '../../assets/profile.svg';
import wallet from '../../assets/wallet.svg';
import edit from '../../assets/profile/edit.svg';
import orders from '../../assets/profile/orders.svg';
import spin from '../../assets/profile/spin.svg';
import gift from '../../assets/profile/gift.svg';
import map from '../../assets/profile/map.svg';
import tickets from '../../assets/profile/tickets.svg';
import cup from '../../assets/profile/cup.svg';
import settings from '../../assets/profile/settings.svg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ProfileDataContext } from '@/app/Context/ProfileContext';

export default function SideData() {
    let { data } = useContext(ProfileDataContext);
    const pathname = usePathname();
    const [display, setDisplay] = useState(true);

    return (
        <div className="profile-sideBar">
            <div className="user-x">
                <div className="user-main-data">
                    <div className="img-cont">
                        <Image src={!data?.image || data?.image == "https://loopz-q8.com/placeholders/logo.jpg" ? van : data.image} width={100} height={100} alt="van" className="img" />
                    </div>
                    <div className="text">
                        <h3>{data?.name || 'Guest User'}</h3>
                        <h4>{data?.country.code + " " + data?.phone || 'N/A'}</h4>
                    </div>
                </div>
                <i className={`fa-solid ${display ? "fa-x" : "fa-bars"} tooggllee`} onClick={() => setDisplay(!display)}></i>
            </div>
            <div className="linkss" style={{ display: display ? 'block' : 'none' }}>
                <div className="wallet-cont">
                    <div className="wallet">
                        <div className="wal-det">
                            <Image src={wallet} alt="wallet" className="wal-img" />
                            <h4>Wallet Balance</h4>
                        </div>
                        <div className="money">
                            <h3>
                                <span>{data?.balance || 0}</span> K.D
                            </h3>
                        </div>
                    </div>
                </div>
                <div className={`links-cont ${pathname === '/profile/edit' ? 'links-cont-active' : ''} `}>
                    <div className="link">
                        <div className="img">
                            <Image src={edit} alt="edit" className="img" />
                        </div>
                        <div className="det">
                            <Link href="/profile/edit">Edit Profile</Link>
                        </div>
                    </div>
                </div>
                <div className={`links-cont ${pathname === '/profile/settings' ? 'links-cont-active' : ''} `}>
                    <div className="link">
                        <div className="img">
                            <Image src={settings} alt='edit' className='img'></Image>
                        </div>
                        <div className="det">
                            <Link href={'/profile/settings'}>Settings</Link>
                        </div>
                    </div>
                </div>
                <div className={`links-cont ${pathname === '/profile/tickets' ? 'links-cont-active' : ''} `}>
                    <div className="link">
                        <div className="img">
                            <Image src={tickets} alt='edit' className='img'></Image>
                        </div>
                        <div className="det">
                            <Link href={'/profile/tickets'}>My Tickets</Link>
                        </div>
                    </div>
                </div>
                <div className={`links-cont ${pathname === '/profile/orders' ? 'links-cont-active' : ''} `}>
                    <div className="link">
                        <div className="img">
                            <Image src={orders} alt='edit' className='img'></Image>
                        </div>
                        <div className="det">
                            <Link href={'/profile/orders'}>Orders</Link>
                        </div>
                    </div>
                </div>
                <div className={`links-cont ${pathname === '/profile/map' ? 'links-cont-active' : ''} `}>
                    <div className="link">
                        <div className="img">
                            <Image src={map} alt='edit' className='img'></Image>
                        </div>
                        <div className="det">
                            <Link href={'/profile/addresses'}>My Addresses</Link>
                        </div>
                    </div>
                </div>
                <div className={`links-cont ${pathname === '/profile/gift' ? 'links-cont-active' : ''} `}>
                    <div className="link">
                        <div className="img">
                            <Image src={gift} alt='edit' className='img'></Image>
                        </div>
                        <div className="det">
                            <Link href={'/profile/gift'}>Vouchers & Gift Cards</Link>
                        </div>
                    </div>
                </div>
                <div className={`links-cont ${pathname === '/profile/rewards' ? 'links-cont-active' : ''} `}>
                    <div className="link">
                        <div className="img">
                            <Image src={cup} alt='edit' className='img'></Image>
                        </div>
                        <div className="det">
                            <Link href={'/profile/rewards'}>Loyalty Points</Link>
                        </div>
                    </div>
                </div>
                <div className={`links-cont ${pathname === '/profile/spin' ? 'links-cont-active' : ''} `}>
                    <div className="link border-none">
                        <div className="img">
                            <Image src={spin} alt='edit' className='img'></Image>
                        </div>
                        <div className="det">
                            <Link href={'/profile/spin'}>Spin a Wheel</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
