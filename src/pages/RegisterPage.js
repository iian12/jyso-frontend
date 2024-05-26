import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Api';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            await api.post('/auth/register', {
                email,
                password,
                nickname,
            });
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-8">Register Page</h1>
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="border rounded px-4 py-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required
                    className="border rounded px-4 py-2 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">Register</button>
            </form>
            <button
                onClick={() => navigate('/login')}
                className="text-blue-500 hover:underline mt-4"
            >
                Go to Login
            </button>
        </div>
    );
};

export default RegisterPage;
