'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { API_BASE_URL } from "@/lib/apiConfig";
import axios from "axios";
import Loading from "@/app/loading";
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage, } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import UserPhoto from "../../assets/profile.svg";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { returnOrder } from "@/app/profile/return-order/returnOrder";




export default function ReturnOrder() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'))
    const searchParams = useSearchParams();
    const [id, setd] = useState(searchParams.get('id'));
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState(null);
    const [seletedItems, setSeletedItems] = useState([]);
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            form.setValue('toyImage', file);
        }
    };
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        setToken(savedToken);
        if (!savedToken) {
            router.push('/login');
        }
        setLoading(true)
        const getTickets = async () => {
            try {
                const response = await axios.get(API_BASE_URL + `/orders/` + id, {
                    headers: {
                        'Accept-Language': 'en',
                        Authorization: `Bearer ${token}`,
                    },
                });
                let data = response.data.data;
                setData(data)
                setLoading(false)
            } catch (error) {
                console.error('Error retrieving data:', error);
                throw new Error('Could not get data');
                setLoading(false)
            }
        };
        getTickets();
    }, []);
    
    const FormSchema = z.object({
        reason: z.string().min(10, {
            message: 'Reason must be at least 10 characters.',
        }),
        toyImage: z.any().optional().refine((file) => file?.size <= 104852760, {
            message: 'invalid File' || 'Max 10 MB files are allowed',
        }),

    });
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            reason: '',
        },
    });

    function onSubmit(data) {
        // handleUpdateProfile(data);
        // form.reset();
        if (seletedItems.length > 0) {
            returnOrder(data,seletedItems, setLoading ,id);
        }
        else {
            toast("Please select items to return", {
                style: {
                    borderColor: "#dc2626",
                    boxShadow: '0px 0px 10px rgba(220, 38, 38, .5)'
                },
            });
        }
        router.push('/profile/order?id=' + id);
    }
    return (
            <div className="edit-profile-cont profile-order ">
                <h3>My Orders</h3>
                {
                    loading ? <Loading /> :
                        <div className="profile-r-side">
                            <div className="add-new-address-heading">
                                <i className="fa-solid fa-arrow-left-long" onClick={() => router.back()}></i>
                                <span>Return Order</span>
                            </div>
                            <h4 className="order-date">Ordered on {data.date}</h4>
                            <h3 className="tab-title">Select Items</h3>
                            <div className="tab-content-tickets">

                                {
                                    data.order_items.map((item, index) =>
                                        <div className="ticket-cont ticket-cont-list" key={item.id}>
                                            <div className="l-side">
                                                <div className="img-cont-small img-cont-small-order">
                                                    <Image src={item.items.image} width={100} height={100} alt="Loops" className="img-of-ticket" />
                                                </div>
                                                <div className="text-cont">
                                                    <h3>{item.items.name}</h3>
                                                    <h5><span className="heavy">{item.items.price} K.D</span></h5>
                                                    <h4>Qnt : <span className="heavy">{item.quantity}</span></h4>
                                                </div>
                                            </div>
                                            <div className="r-side">
                                                <div className="check-box-return" onClick={() => {
                                                    if (seletedItems.includes(item.id)) {
                                                        setSeletedItems(seletedItems.filter((id) => id !== item.id));
                                                    } else {
                                                        setSeletedItems([...seletedItems, item.id]);
                                                    }
                                                }
                                                }>
                                                    {
                                                        seletedItems.includes(item.id) ?
                                                            <i className="fa-solid fa-check" ></i> :
                                                            null
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                    )
                                }

                            </div>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data">
                                    {/* Full Name */}
                                    <h3 className="tab-title">Return Reason</h3>
                                    <FormField
                                        control={form.control}
                                        name="reason"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Textarea className='shadow-none mb-3 h-28 bg-[#F9F9F9]' placeholder="Describe Return Reason" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className='profile-img-contt profile-img-return '>
                                        <h3 className="tab-title">Photo Of Products</h3>
                                        <FormField control={form.control} name="toyImage"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        <label htmlFor="toyImage" className='img-label-return' >
                                                            <div className="img-triger-cont">
                                                                {
                                                                    selectedImage ?
                                                                        <Image src={selectedImage || UserPhoto} className="profile-img" alt="Loopz" width={200} height={200} />
                                                                        : <>
                                                                            <i className="fa-solid fa-arrow-up-from-bracket"></i>
                                                                            <span>Upload Image</span>
                                                                        </>
                                                                }
                                                            </div>
                                                        </label>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input  {...field} id="toyImage" type="file" value="" accept="image/*" style={{ display: 'none' }}
                                                            className="border mx-auto px-2  py-7 text-lg rounded-md"
                                                            onChange={handleImageChange} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button type="submit" className="submit-btn return-btn">Send Request</Button>
                                </form>
                            </Form>
                        </div>
                }
            </div>
    );
}
