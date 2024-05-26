import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Api';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post('/auth/login', {
                email,
                password,
            });
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            navigate('/posts'); // 로그인 성공 시 게시글 목록 페이지로 이동
        } catch (error) {
            setError('Failed to login. Please check your email and password.');
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-8">Login Page</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border rounded px-4 py-2 w-full"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border rounded px-4 py-2 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">Login</button>
            </form>
            <button
                onClick={() => navigate('/register')}
                className="text-blue-500 hover:underline mt-4"
            >
                Go to Register
            </button>
        </div>
    );
};

export default LoginPage;
