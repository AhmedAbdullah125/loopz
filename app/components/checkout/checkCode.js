import { API_BASE_URL } from '@/lib/apiConfig';
import axios from 'axios';
import { toast } from 'sonner';


export const checkCode = async (data, setLoading ,setDiscount ,setCode) => {

    setLoading(true); // Set loading state
    const formData = new FormData();
    formData.append('code', data); // Fallback if street is undefined
    const url = `${API_BASE_URL}/orders/check-code`; // API endpoint
    try {
        const response = await axios.post(url, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            
        });
        setLoading(false); // Reset loading state
        
        if (response.status === 200) {
            const message = response.data?.data.voucher_percentage + " K.D Discount was applied" || 'Voucher applied successfully';
            setDiscount(Number(response.data?.data.voucher_percentage)*-1);
            setCode(data);
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
