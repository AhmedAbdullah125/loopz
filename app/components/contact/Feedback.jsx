'use client'; // This enables client-side rendering for this component in Next.js
// Import necessary hooks and libraries
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'; // For form validation using Zod schema
import { z } from 'zod'; // Zod library for schema-based validation
import { Button } from '@/components/ui/button'; // Button UI component
// Import UI components for form handling
import { Form, FormField, FormItem, FormControl, FormMessage,} from '@/components/ui/form';
import { useState } from 'react'; // State management hook
import 'react-phone-number-input/style.css'; // Styles for phone input component
import { API_BASE_URL } from '@/lib/apiConfig'; // Base URL for API requests
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { Label } from '@radix-ui/react-label';
import { review } from './reviews';

export default function Feedback() {
    const FormSchema = z.object({
        feedback: z.string() .min(10, { message: 'Phone number must be at least 10 characters.' }),
        rate: z .string() .refine(value => ["1", "2", "3", "4", "5"].includes(value), { message: "Please select your rating", }),
    });
    // Additional state variables for managing API call status
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state for API requests
    const [error, setError] = useState(null); // Error state
    const [rate, setRate] = useState(0);
    // Initialize React Hook Form with Zod validation schema
    const form = useForm({
        resolver: zodResolver(FormSchema), // Use Zod schema for validation
        defaultValues: {
            feedback: '',
            rate: String(rate),
        }, // Default form values
    });
    const handleSubmit = async (data) => {
        await review(API_BASE_URL, data, setLoading);
    };

    // Form submission handler
    function onSubmit(data) {
        console.log(data);

        handleSubmit(data); // Call API request function
        form.reset(); // Reset form fields
    }


    return (
        <div className="feedback">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Phone number input field */}
                    <h2>Feedback</h2>
                    <FormField
                        control={form.control}
                        name="rate"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl className="rate">
                                    <RadioGroup {...field} // Spread `field` to ensure React Hook Form integrates with the `RadioGroup`
                                        onValueChange={(value) => {
                                            setRate(Number(value)); // Update the local `rate` state
                                            field.onChange(value); // Call `onChange` to update React Hook Form's state
                                        }}>
                                        <div className="rate-raiata">
                                            {/* Individual radio items */}
                                            <RadioGroupItem value="1" id="1" />
                                            <Label htmlFor="1">
                                                <i className={`${rate >= 1 ? "goldenStar" : "grayStar"} fa fa-star`} onClick={() => setRate(1)}></i>
                                            </Label>

                                            <RadioGroupItem value="2" id="2" />
                                            <Label htmlFor="2">
                                                <i className={`${rate >= 2 ? "goldenStar" : "grayStar"} fa fa-star`} onClick={() => setRate(2)}></i>
                                            </Label>

                                            <RadioGroupItem value="3" id="3" />
                                            <Label htmlFor="3">
                                                <i className={`${rate >= 3 ? "goldenStar" : "grayStar"} fa fa-star`} onClick={() => setRate(3)} ></i>
                                            </Label>

                                            <RadioGroupItem value="4" id="4" />
                                            <Label htmlFor="4">
                                                <i className={`${rate >= 4 ? "goldenStar" : "grayStar"} fa fa-star`} onClick={() => setRate(4)} ></i>
                                            </Label>

                                            <RadioGroupItem value="5" id="5" />
                                            <Label htmlFor="5">
                                                <i className={`${rate >= 5 ? "goldenStar" : "grayStar"} fa fa-star`} onClick={() => setRate(5)} ></i>
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage /> {/* Validation error message */}
                            </FormItem>
                        )}
                    />
                    <FormField control={form.control} name="feedback"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea placeholder="Type your message here."  {...field} />
                                </FormControl>
                                <FormMessage /> {/* Validation error message */}
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Loading...' : 'Send'}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
