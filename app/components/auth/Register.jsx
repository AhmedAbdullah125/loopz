'use client'; // This enables client-side rendering for this component in Next.js
// Import necessary hooks and libraries
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'; // For form validation using Zod schema
import { z } from 'zod'; // Zod library for schema-based validation
import { Button } from '@/components/ui/button'; // Button UI component
import logo from '../../assets/loops.svg'; // Import the logo image

// Import UI components for form handling
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

import Image from 'next/image'; // For optimized image rendering in Next.js
import { use, useEffect, useState } from 'react'; // State management hook
import Link from 'next/link'; // Link component for navigation
import PhoneInput from 'react-phone-number-input'; // Phone input component
import 'react-phone-number-input/style.css'; // Styles for phone input component
import { API_BASE_URL } from '@/lib/apiConfig'; // Base URL for API requests
import { toast } from 'sonner'; // Toast notification library
import axios from 'axios'; // HTTP client for API requests
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export default function Register({step, setStep , setPhone}) {
    const router = useRouter();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.back();
        }
    }, [])
    // State to manage the phone number input
    const [phoneNumber, setPhoneNumber] = useState(null);

    // Zod schema for validating the phone number input
    const FormSchema = z.object({
        phone: z.string()
            .min(13, { message: 'Phone number must be at least 13 characters.' })
            .regex(/^\+?\d+$/, { message: 'Phone number must start with a plus sign and contain only digits.' }),
        fullName: z.string().min(2, {
            message: 'Please enter your name' || 'name must be at least 2 characters.',
        }),
        email: z.string().email({
            message: 'Please enter a valid email' || 'Invalid email address',
        }),

    });

    // Additional state variables for managing API call status
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state for API requests
    const [error, setError] = useState(null); // Error state

    // Function to handle API POST requests
    const sendPostRequest = async (data) => {
        setLoading(true); // Set loading state
        const url = `${API_BASE_URL}/auth/register`; // API endpoint

        // Prepare the request payload
        const queryParams = {
            phone: data.phone,
            name: data.fullName,
            email: data.email,
            country_id: 1,

        };

        return axios({
            method: 'post',
            url: url,
            data: queryParams,
            headers: { lang: 'en' }, // Optional headers
        })
            .then(response => {
                setLoading(false); // Reset loading state
                // Get message from response
                const message = response.data?.data || 'Operation successful';

                if (response.status === 200) {
                    // Success toast notification
                    toast(message, {
                        style: {
                            borderColor: "#28a745",
                            boxShadow: '0px 0px 10px rgba(40, 167, 69, .5)'
                        },
                    });
                    // Redirect or perform additional actions
                    setStep('verify');
                    setPhone(data.phone);
                } else {
                    // Handle unexpected responses
                    toast('Unexpected response', {
                        style: { borderColor: "#dc3545" },
                        description: 'Unexpected response',
                    });
                }
            })
            .catch(error => {
                setLoading(false); // Reset loading state

                // Log the error for debugging
                // Extract error message from response
                const errorMessage = error?.response?.data.msg || error.message || 'An unknown error occurred';

                // Display error toast notification
                toast(errorMessage, {
                    style: {
                        borderColor: "#dc3545",
                        boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)'
                    },
                });
            });
    };

    // Initialize React Hook Form with Zod validation schema
    const form = useForm({
        resolver: zodResolver(FormSchema), // Use Zod schema for validation
        defaultValues: {
            fullName: '',
            phone: '',
            email: '',
        },
        // Default form values
    });

    // Form submission handler
    function onSubmit(data) {
        sendPostRequest(data); // Call API request function
    }

    return (
        <div className='login'>
            <div className="container">
                <div className="login-cont">
                    {/* Display the logo */}
                    <Image src={logo} alt='loopz' className='logo'></Image>

                    <div className='login-form'>
                        <h2>Create Account</h2>
                        <h3 className='max-w-[225px] mx-auto'>Please complete following data to create your account</h3>

                        {/* Form component */}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                {/* Phone number input field */}
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-blackText text-xl font-extrabold"> Phone Number </FormLabel>
                                            <FormControl>
                                                {/* Phone input component */}
                                                <PhoneInput
                                                    placeholder="+965 00000000"
                                                    value={phoneNumber || null}
                                                    onChange={setPhoneNumber}
                                                    defaultCountry="KW"
                                                    className="phoneInput-cont"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage /> {/* Validation error message */}
                                        </FormItem>
                                    )} />
                                <FormField control={form.control} name="fullName" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-blackText text-xl font-extrabold"> Your Name </FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Enter Your Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-blackText text-xl font-extrabold"> Your E-mail </FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="Enter Your E-mail" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />

                                {/* Submit button */}
                                <Button type="submit" className="submit-btn" disabled={loading}>
                                    {loading ? 'Loading...' : 'Create Account'}
                                </Button>
                            </form>
                        </Form>

                        {/* Link to registration page */}
                        <div className="have-account">
                            <span>Already have account? </span>
                            <Link href="/login">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
