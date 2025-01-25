'use client';
import { set, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage, } from '@/components/ui/form';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input';
import UserPhoto from '../../assets/profile.svg';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/lib/apiConfig';
import axios from 'axios';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { Label } from '@radix-ui/react-label';
import { logOut } from './logout';
import { ProfileDataContext, useProfileData } from '@/app/Context/ProfileContext';
import Loading from '@/app/loading';
import { updateProfile } from './updateProfileData';
export default function EditPage() {


    let { data } = useContext(ProfileDataContext || null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [country, setCountry] = useState(data?.country.id || 0);
    const [selectedImage, setSelectedImage] = useState(data?.image == null || data.image == undefined || data.image == "https://loopz-q8.com/placeholders/logo.jpg" ? UserPhoto : data.image);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [token, setToken] = useState(null);
    
    useEffect(() => {
        // Retrieve token from localStorage
        const savedToken = localStorage.getItem('token');
        setToken(savedToken);
        if (!savedToken) {
            router.push('/login');
        }
    }, []);
    const FormSchema = z.object({
        fullName: z.string().min(2, {
            message: 'name must be at least 2 characters.',
        }),
        email: z.string().email({
            message: 'Please enter a valid email' || 'Invalid email address',
        }),

        phone: z.string().min(8, {
            message: 'Phone number must be 8 characters.',
        }).regex(/^\+?\d+$/, {
            message:
                'Phone number must start with a plus sign and contain only digits.',
        }),

        profileImage: z.any().optional().refine((file) => file?.size <= 104852760, {
            message: 'invalid File' || 'Max 10 MB files are allowed',
        }),
        country: z
            .string()
            .refine(value => ["1", "3"].includes(value), {
                message: "Please select your Country",
            }),
    });
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            form.setValue('profileImage', file);
        }
    };
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            fullName: data?.name || '',
            phone: data?.phone || '',
            email: data?.email || '',
            profileImage: data?.image || '',
            country: String(data?.country.id) || '',
        },
    });

    function onSubmit(data) {
        handleUpdateProfile(data);
        // form.reset();
        router.refresh();
    }
    //log out function

    const handleLogout = () => {
        logOut(API_BASE_URL, setLoading, router, toast);
    };
    const handleUpdateProfile = async (data) => {
        await updateProfile(data, setLoading);
    };
    return (
        <div className='edit-profile-cont'>
            <h3>Edit Profile</h3>
            {
                loading ? <Loading /> :
                    <div className='profile-r-side'>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data">
                                <div className='profile-img-contt'>
                                    <FormField control={form.control} name="profileImage"
                                        render={({ field }) => (
                                            <FormItem> <FormLabel>
                                                <label htmlFor="profileImage" className='profile-img-lable' >
                                                    <Image src={selectedImage || UserPhoto} className="profile-img" alt="Loopz" width={200} height={200} />
                                                </label>
                                            </FormLabel>
                                                <FormControl>
                                                    <Input  {...field} id="profileImage" type="file" value="" accept="image/*" style={{ display: 'none' }}
                                                        className="border mx-auto px-2  py-7 text-lg rounded-md"
                                                        onChange={handleImageChange} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {/* Date and Phone */}

                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-blackText text-xl font-extrabold">  Phone Number </FormLabel>
                                            <FormControl>
                                                <PhoneInput placeholder="+965 00000000" value={phoneNumber || null} onChange={setPhoneNumber} defaultCountry="KW"
                                                    className="phoneInput-cont" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Full Name */}
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel> full Name </FormLabel>
                                            <FormControl>
                                                <Input className='shadow-none bg-[#F9F9F9]' placeholder="Enter your full name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* email */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>E-mail</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your address"  {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Country</FormLabel>
                                            <FormControl className="rate">
                                                <RadioGroup
                                                    {...field} // Spread `field` to ensure React Hook Form integrates with the `RadioGroup`
                                                    onValueChange={(value) => {
                                                        setCountry(Number(value)); // Update the local `rate` state
                                                        field.onChange(value); // Call `onChange` to update React Hook Form's state
                                                    }}
                                                >
                                                    <div className="rate-raiata">
                                                        {/* Individual radio items */}
                                                        <RadioGroupItem value="1" id="1" />
                                                        <Label htmlFor="1">
                                                            <div className="tab-bullet-cont">
                                                                <div className="bullet">
                                                                    {
                                                                        country == 1 ? <div className="bullet-dot"></div> : null
                                                                    }
                                                                </div>
                                                                Kuwait
                                                            </div>
                                                        </Label>
                                                        <RadioGroupItem value="3" id="3" />
                                                        <Label htmlFor="3">
                                                            <div className="tab-bullet-cont">
                                                                <div className="bullet">
                                                                    {
                                                                        country == 3 ? <div className="bullet-dot"></div> : null
                                                                    }
                                                                </div>
                                                                Egypt
                                                            </div>
                                                        </Label>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage /> {/* Validation error message */}
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="submit-btn">Update Changes </Button>
                            </form>
                        </Form>
                        <div className="logout">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="outline" className="border-none shadow-none"><i className="fa-solid fa-right-from-bracket"></i> Logout</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                                        {/* <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    account and remove your data from our servers.
                                </AlertDialogDescription> */}
                                    </AlertDialogHeader>
                                    <AlertDialogFooter className={"flex flex-col-reverse sm:flex-row sm:justify-center sm:space-x-2"}>
                                        <AlertDialogCancel className="mt-2 sm:mt-0">Cancel</AlertDialogCancel>
                                        <AlertDialogAction className="mt-2 sm:mt-0 bg-[#EB0017]" onClick={handleLogout}>Log out</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
            }
        </div>
    );
}