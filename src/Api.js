const BASE_API = 'https://api.b7web.com.br/devbarber/api';

export default {
    checkToken: async (token) => {
        const request = await fetch(`${BASE_API}/auth/refresh`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token}),
        });
        const response = await request.json();
        return response;
    },
    signIn: async (email, password) => {
        const request = await fetch(`${BASE_API}/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        });
        const response = await request.json();
        return response;
    },
    signUp: async (name, email, password) => {
        const request = await fetch(`${BASE_API}/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password}),
        });
        const response = await request.json();
        return response;
    }
};