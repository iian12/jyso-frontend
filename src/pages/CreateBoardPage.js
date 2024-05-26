import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Api';

const CreateBoardPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('FREE');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            setError('You must be logged in to create a post.');
            return;
        }

        try {
            await api.post('/board', {
                title,
                content,
                category,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            navigate('/posts'); // 게시글 목록 페이지로 이동
        } catch (error) {
            setError('Failed to create post. Please try again.');
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-8">Create Post</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4 w-1/2">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="border rounded px-4 py-2 w-full"
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="border rounded px-4 py-2 w-full h-40"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="border rounded px-4 py-2 w-full"
                >
                    <option value="FREE">Free</option>
                    <option value="SUGGESTION">Suggestion</option>
                    <option value="ISSUE">Issue</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 w-full">Submit</button>
            </form>
        </div>
    );
};

export default CreateBoardPage;
