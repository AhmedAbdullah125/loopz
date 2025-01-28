'use client';

import { useContext, useEffect, useState } from 'react';
import 'react-phone-number-input/style.css';
import { useRouter } from 'next/navigation';
import { Switch } from "@/components/ui/switch"
import { toggleNotification } from './toggelNotification';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ProfileDataContext } from '@/app/Context/ProfileContext';
export default function SettingsPage() {


    const router = useRouter();
    let {data} = useContext(ProfileDataContext || null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);
    useEffect(() => {
        // Retrieve token from localStorage
        const savedToken = localStorage.getItem('token');
        setToken(savedToken);
        if (!savedToken) {
            router.push('/login');
        }
    }, []);
    
    const handleToggleNotification = () => {
        toggleNotification(setLoading);
    };
    
    return (
        <div className='edit-profile-cont'>
            <h3>Settings</h3>
            <div className='profile-r-side'>
                <div className="setting has-switch">
                    <h4>Notification</h4>
                    <div className="flex items-center space-x-2">
                        <Switch id="airplane-modee" disabled={loading} defaultChecked={data?.is_notifications_allowed} onCheckedChange={() => { handleToggleNotification(); }} />
                    </div>
                </div>
                <div className="setting relative has-dropdown">
                    <h4>Language</h4>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="flex items-center gap-2 border-[none !important] p-0 shadow-none outline-none" variant="outline"><span>En</span><i className="fa-solid fa-chevron-right"></i></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Language</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem onClick={() => { console.log("English");}}>
                                    English
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => { console.log("Arabic");}}>
                                    Arabic
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}