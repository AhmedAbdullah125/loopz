'use client'; // This enables client-side rendering for this component in Next.j
// Import necessary hooks and libraries
import { set, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'; // For form validation using Zod schema
import { z } from 'zod'; // Zod library for schema-based validation
import { Button } from '@/components/ui/button'; // Button UI component
import logo from '../../assets/loops.svg'; // Import the logo image
import { InputOTP, InputOTPGroup, InputOTPSlot, } from "@/components/ui/input-otp"
import { Form, FormField,FormItem, FormControl, FormLabel, FormMessage,} from '@/components/ui/form';
import Image from 'next/image'; // For optimized image rendering in Next.js
import { useState } from 'react'; // State management hook
import Link from 'next/link'; // Link component for navigation
import 'react-phone-number-input/style.css'; // Styles for phone input component
import { API_BASE_URL } from '@/lib/apiConfig'; // Base URL for API requests
import { useRouter } from 'next/navigation';
import { verify } from './verify';

export default function Verfiy({ phone }) {
    const router = useRouter();
    // State to manage the phone number input
    // Zod schema for validating the phone number input
    const FormSchema = z.object({
        otp: z.string().min(4, { message: 'OTP must be 6 digits' }),
    });
    // Additional state variables for managing API call status
    const [loading, setLoading] = useState(false); // Loading state for API requests
    // Function to handle API POST requests
    const handleSubmit = async (data) => {
        await verify(API_BASE_URL, phone, data, router, setLoading);
    };
    // Initialize React Hook Form with Zod validation schema
    const form = useForm({
        resolver: zodResolver(FormSchema), // Use Zod schema for validation
        defaultValues: { otp: '' }, // Default form values
    });
    // Form submission handler
    function onSubmit(data) {
        handleSubmit(data);
    }
    return (
        <div className='login'>
            <div className="container">
                <div className="login-cont">
                    {/* Display the logo */}
                    <Image src={logo} alt='loopz' className='logo'></Image>
                    <div className='login-form'>
                        <h2>Verification</h2>
                        <div className="verify-head">
                            <h3>Please enter OTP Code sent to phone number </h3>
                            <h4>{phone}</h4>
                        </div>
                        {/* Form component */}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                {/* Phone number input field */}
                                <FormField
                                    control={form.control}
                                    name="otp"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-blackText text-xl font-extrabold">
                                                Phone Number
                                            </FormLabel>
                                            <div className="otp">
                                                <FormControl>
                                                    {/* Phone input component */}
                                                    <InputOTP maxLength={4} pattern={/^[0-9]+$/} className="otp-input" {...field}>
                                                        <InputOTPGroup>
                                                            <InputOTPSlot index={0} />
                                                            <InputOTPSlot index={1} />
                                                            <InputOTPSlot index={2} />
                                                            <InputOTPSlot index={3} />
                                                        </InputOTPGroup>
                                                    </InputOTP>
                                                </FormControl>
                                            </div>
                                            <FormMessage /> {/* Validation error message */}
                                        </FormItem>
                                    )}
                                />
                                {/* Submit button */}
                                <Button type="submit" className="submit-btn" disabled={loading}>
                                    {loading ? 'Loading...' : 'Verfiy'}
                                </Button>
                            </form>
                        </Form>
                        {/* Link to registration page */}
                        <div className="have-account">
                            <span>Do not have an account? </span>
                            <Link href="/register" className={`${loading ? 'opacityp-50' : ''}`}>Create Account</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
