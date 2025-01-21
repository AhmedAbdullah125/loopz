import { API_BASE_URL } from '@/lib/apiConfig';
import axios from 'axios';
import { toast } from 'sonner';


export const toggleNotification = async (setLoading) => {
    setLoading(true); // Set loading state
    const formData = new FormData();

    const url = `${API_BASE_URL}/auth/toggle-notifications`; // API endpoint
    try {
        const response = await axios.post(url, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        setLoading(false); // Reset loading state

        if (response.status === 200) {
            const message = response.data?.message || 'Profile updated successfully';
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
