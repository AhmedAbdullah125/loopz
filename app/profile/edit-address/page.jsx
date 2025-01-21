'use client';

import { useEffect, useState } from 'react';
import 'react-phone-number-input/style.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import {
    Form, FormField, FormItem, FormControl, FormLabel, FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { API_BASE_URL } from '@/lib/apiConfig';
import Loading from '@/app/loading';
import {
    Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { updateAddress } from './updateAddress';

export default function Address() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const router = useRouter();

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loadingAddress, setLoadingAddress] = useState(true);
    const [loadingGovernorates, setLoadingGovernorates] = useState(true);
    const [data, setData] = useState(null);
    const [governorates, setGovernorates] = useState([]);
    const [selectedGovernorate, setSelectedGovernorate] = useState('');

    useEffect(() => {
        // Retrieve token from localStorage
        const savedToken = localStorage.getItem('token');
        setToken(savedToken);
        if (!savedToken) {
            router.push('/login');
        }
    }, []);

    useEffect(() => {
        // Fetch address details
        const getAddress = async () => {
            if (!token) return;

            try {
                const response = await axios.get(`${API_BASE_URL}/addresses/${id}`, {
                    headers: {
                        'Accept-Language': 'ar',
                        Authorization: `Bearer ${token}`,
                    },
                });
                setData(response.data.data);
            } catch (error) {
                console.error('Error retrieving address:', error);
            } finally {
                setLoadingAddress(false);
            }
        };
        // Fetch governorates
        const getGovernorates = async () => {
            if (!token) return;
            try {
                const response = await axios.get(`${API_BASE_URL}/governorates`, {
                    headers: {
                        'Accept-Language': 'ar',
                        Authorization: `Bearer ${token}`,
                    },
                });
                setGovernorates(response.data.data);
            } catch (error) {
                console.error('Error retrieving governorates:', error);
            } finally {
                setLoadingGovernorates(false);
            }
        };
        getAddress();
        getGovernorates();
    }, [token, id]);
    console.log(governorates);
    console.log(data);
    const form = useForm({
        resolver: zodResolver(
            z.object({
                street: z.string().min(2, 'Street name must be at least 2 characters.'),
                governorate: z.string().min(1, 'You have to select a governorate.'),
                city: z.string().min(1, 'You have to select a city.'),
                addressName: z.string().min(2, 'Postal code must be at least 2 characters.'),
                buildingNo: z.string().min(1, 'Please enter your building number'),
            })
        ),
        defaultValues: {
            street: '',
            governorate: '',
            city: '',
            addressName: '',
            buildingNo: '',
        },
    });
    useEffect(() => {
        if (data) {
            form.setValue('street', data.street);
            form.setValue('governorate', String(data.governorate.id));
            form.setValue('city', String(data.city.id));
            form.setValue('addressName', data.address);
            form.setValue('buildingNo', data.building_no);
            setSelectedGovernorate(String(data.governorate.id));
        }
    }, [data]);
    function onSubmit(data) {
        handleUpdateAddress(data);
        // form.reset();
        router.back();
    }
    const handleUpdateAddress = async (data) => {
        await updateAddress(id, data, setLoadingAddress);
    };
    if (loadingAddress || loadingGovernorates) {
        return <Loading />;
    }
    return (
        <div className="edit-profile-cont">
            <h3>Edit Address</h3>
            <div className="profile-r-side">
                <div className="add-new-address-heading">
                    <i className="fa-solid fa-arrow-left-long" onClick={() => router.back()}></i>
                    <span>{data?.address}</span>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="edit-address-form">
                        <FormField
                            control={form.control}
                            name="addressName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter your address" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="buildingNo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>building Number</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter your building number" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Governorate Select */}
                        <FormField
                            control={form.control}
                            name="governorate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Governorate</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value}
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                setSelectedGovernorate(value);
                                                form.setValue('city', ''); // Reset city
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Governorate" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {governorates.map((gov) => (
                                                        <SelectItem key={gov.id} value={String(gov.id)}>
                                                            {gov.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* City Select */}
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select City" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {governorates
                                                        .find((gov) => String(gov.id) === selectedGovernorate)
                                                        ?.cities.map((city) => (
                                                            <SelectItem key={city.id} value={String(city.id)}>
                                                                {city.name}
                                                            </SelectItem>
                                                        ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Street and Postal Code */}
                        <FormField
                            control={form.control}
                            name="street"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Street</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter Street Name" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="submit-btn col-span-2">Update Changes</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
