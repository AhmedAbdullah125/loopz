import { API_BASE_URL } from '@/lib/apiConfig';
import axios from 'axios';
import { toast } from 'sonner';


export const favourateToggle = async (id,type) => {
console.log(id,type);

    const formData = new FormData();
    formData.append('favoritable_id', id); // Fallback if street is undefined
    formData.append('type', type); // Fallback if street is undefined
    const url = `${API_BASE_URL}/favorites`; // API endpoint
    try {
        const response = await axios.post(url, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },

        });

        if (response.status === 200) {
           
            toast("Favorites Updated", {
                style: {
                    borderColor: "#28a745",
                    boxShadow: '0px 0px 10px rgba(40, 167, 69, .5)',
                },
            });
        } else {
            const unexpectedMessage = response.data;
            toast(unexpectedMessage, {
                style: {
                    borderColor: "#dc3545",
                    boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)',
                },
            });
        }
    } catch (error) {
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
