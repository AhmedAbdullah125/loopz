import axios from 'axios';
import { toast } from 'sonner';

export const verify = async (API_BASE_URL, phone, data, router, setLoading) => {
    setLoading(true); // Set loading state
    const url = `${API_BASE_URL}/auth/verify-code`; // API endpoint

    try {
        // Prepare the request payload
        const queryParams = {
            phone: phone,
            code: data.otp,
        };

        const response = await axios({
            method: 'post',
            url: url,
            data: queryParams,
            headers: { lang: 'en' }, // Optional headers
        });

        setLoading(false); // Reset loading state
        // Get message from response
        const message = response.data?.data || 'Operation successful';

        if (response.status === 200) {
            // Success toast notification
            toast(`Hello ${message.name}`, {
                style: {
                    borderColor: "#28a745",
                    boxShadow: '0px 0px 10px rgba(40, 167, 69, .5)',
                },
            });
            // Store token in local storage
            localStorage.setItem('token', message.token);

            // Redirect or perform additional actions
            router.refresh();
            router.push('/profile');
            location.reload();
        } else {
            // Handle unexpected responses
            toast('Unexpected response', {
                style: {
                    borderColor: "#dc3545",
                    boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)',
                },
            });
        }
    } catch (error) {
        setLoading(false);
         // Extract error message from response
        const errorMessage = error?.response?.data.msg || error.message || 'An unknown error occurred';
        // Display error toast notification
        toast(errorMessage, {
            style: {
                borderColor: "#dc3545",
                boxShadow: '0px 0px 10px rgba(220, 53, 69, .5)',
            },
        });
    }
};
