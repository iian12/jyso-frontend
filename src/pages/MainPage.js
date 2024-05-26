import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-8">Main Page</h1>
            <nav>
                <ul className="space-y-4">
                    <li>
                        <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
                    </li>
                    <li>
                        <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                    </li>
                    <li>
                        <Link to="/posts" className="text-blue-500 hover:underline">Post List</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default MainPage;
