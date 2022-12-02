import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (name, email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('http://localhost:5000/api/user/signup', {
            method: "POST",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }

        if (response.ok) {
            // save the user to local storge
            localStorage.setItem("user", JSON.stringify(json));

            // update the auth context
            dispatch({ type: "LOGIN", payload: json });

            setIsLoading(false);
        }
    }

    return { signup, isLoading, error };
}