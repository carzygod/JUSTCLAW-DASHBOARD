export const API_URL = import.meta.env.VITE_API_URL;

export const fetchApi = async (endpoint, options = {}) => {
    const token = localStorage.getItem('authToken');
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers
        });

        const data = await response.json();

        if (!response.ok) {
            if (response.status === 401) {
                // Handle unauthorized (optional: redirect to login)
                localStorage.removeItem('authToken');
                window.location.href = '/login';
            }
            throw new Error(data.error || 'API Error');
        }

        return data;
    } catch (err) {
        console.error(`API Error (${endpoint}):`, err);
        throw err;
    }
};
