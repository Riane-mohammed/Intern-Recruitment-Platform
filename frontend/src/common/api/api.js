const BASE_URL = "http://localhost:8080"; 

export const apiRequest = async (endpoint, method = "GET", payload = null) => {
    try {
        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (payload) {
            options.body = JSON.stringify(payload);
        }

        const response = await fetch(`${BASE_URL}/${endpoint}`, options);

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error("API request error:", error);
        throw error;
    }
};

