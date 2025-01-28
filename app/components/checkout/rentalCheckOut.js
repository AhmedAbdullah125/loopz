import { API_BASE_URL } from '@/lib/apiConfig';
import axios from 'axios';
import { toast } from 'sonner';


export const rentalCheckOut = async (product, setLoading, address, selectedTab, quantity, code, router,startDate, endDate) => {

    setLoading(true); // Set loading state
    const formData = new FormData();
    formData.append('address_id', address);
    formData.append(`product_id`, product);
    formData.append(`quantity`, Number(quantity));
    formData.append('date_from', startDate);
    formData.append('date_to', endDate);
    formData.append('code', code);
    if (selectedTab == 1) {
        formData.append('payment_method', "card");
    }
    else if (selectedTab == 2) {
        formData.append('payment_method', "wallet");
    }
    else if (selectedTab == 3) {
        formData.append('payment_method', "cash");
    }
    const url = `${API_BASE_URL}/rentals`; // API endpoint
    try {
        const response = await axios.post(url, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Accept-Language': "ar",
            },

        });
        setLoading(false); // Reset loading state

        if (response.status === 200) {
            if (selectedTab == 1) {
                const message = response.data?.data.status_text || 'Order Submited Successfully';
                toast(message, {
                    style: {
                        borderColor: "#28a745",
                        boxShadow: '0px 0px 10px rgba(40, 167, 69, .5)',
                    },
                });
                router.push(response.data.data.payment_url);
            }
            else {
                const message = response.data?.data.status_text || 'Order Submited Successfully';
                toast(message, {
                    style: {
                        borderColor: "#28a745",
                        boxShadow: '0px 0px 10px rgba(40, 167, 69, .5)',
                    },
                });
                router.push('/profile/orders');
            }

        } else {
            const unexpectedMessage = response.data?.message.status_text || 'Unexpected response';
            toast(unexpectedMessage, {
                style: {
                    borderColor: "#dc3545",
                    boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)',
                },
            });
        }
    } catch (error) {
        setLoading(false); // Reset loading state
        console.error('Profile update error:', error);
        const errorMessage = error?.response?.data?.msg || error.message || 'An unknown error occurred';
        toast(errorMessage, {
            style: {
                borderColor: "#dc3545",
                boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)',
            },
        });
    }
};
