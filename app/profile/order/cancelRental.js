import { API_BASE_URL } from '@/lib/apiConfig';
import axios from 'axios';
import { toast } from 'sonner';

export const cancelRental = async (setLoading, id, router) => {
    setLoading(true); // Set loading state
    const url = `${API_BASE_URL}/rentals/canceled/${id}`; // API endpoint
    const formData = new FormData();
    formData.append('_method', 'PUT'); // Fallback if street is undefined
    console.log(id);

    try {
        const response = await axios.post(url,formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        setLoading(false); // Reset loading state

        if (response.status === 200) {
            const message = response.data?.message || 'Order canceled successfully';
            console.log(message);

            // Success toast notification
            toast(message, {
                style: {
                    borderColor: "#28a745",
                    boxShadow: '0px 0px 10px rgba(40, 167, 69, .5)'
                },
            });
            router.back();
            return id;
        } else {
            const unexpectedMessage = response.data?.message || 'Unexpected response';
            toast(unexpectedMessage, {
                style: {
                    borderColor: "#dc3545",
                    boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)'
                },
            });
        }
    } catch (error) {
        setLoading(false); // Reset loading state

        // Log the error for debugging
        console.error('Logout error:', error);

        // Extract error message from response
        const errorMessage = error?.response?.data?.msg || error.message || 'An unknown error occurred';

        // Display error toast notification
        toast(errorMessage, {
            style: {
                borderColor: "#dc3545",
                boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)'
            },
        });
    }
};
