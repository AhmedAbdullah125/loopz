import { API_BASE_URL } from '@/lib/apiConfig';
import axios from 'axios';
import { toast } from 'sonner';


export const returnOrder = async (data, seletedItems, setLoading, id) => {
    setLoading(true); // Set loading state
    const formData = new FormData();
    formData.append('images[0]', data.toyImage);
    formData.append('reason', data.reason);
    formData.append('order_id', id);

    for (let index = 0; index < seletedItems.length; index++) {
        formData.append(`toys[${index}][order_item_id]`, seletedItems[index]);
    }

    const url = `${API_BASE_URL}/return-order`; // API endpoint
    try {
        const response = await axios.post(url, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Accept-Language': "ar",
            },
        });
        setLoading(false); // Reset loading state

        if (response.status === 200) {
            const message = response.data?.message || 'Toy returned successfully';
            toast(message, {
                style: {
                    borderColor: "#28a745",
                    boxShadow: '0px 0px 10px rgba(40, 167, 69, .5)',
                },
            });
        } else {
            const unexpectedMessage = response.data?.message || 'Unexpected response';
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
