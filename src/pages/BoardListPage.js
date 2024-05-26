import React, { useEffect, useState } from 'react';
import api from '../Api';
import { Link, useNavigate } from 'react-router-dom';

const BoardListPage = () => {
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState('FREE');
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get(`/board/category/${category}`, {
                    params: { page: page, size: 10 },
                });
                setPosts(response.data || []);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPosts();
    }, [category, page]);

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        setPage(1);
    };

    return (
        <div className="p-4">
            <h1 className="text-4xl font-bold mb-8">Post List Page</h1>
            <div className="mb-4">
                <button
                    onClick={() => handleCategoryChange('FREE')}
                    className={`mr-4 ${category === 'FREE' ? 'font-bold' : ''}`}
                >
                    Free
                </button>
                <button
                    onClick={() => handleCategoryChange('SUGGESTION')}
                    className={`mr-4 ${category === 'SUGGESTION' ? 'font-bold' : ''}`}
                >
                    Suggestion
                </button>
                <button
                    onClick={() => handleCategoryChange('ISSUE')}
                    className={`${category === 'ISSUE' ? 'font-bold' : ''}`}
                >
                    Issue
                </button>
            </div>
            <div className="mb-4">
                {accessToken ? (
                    <button
                        onClick={() => navigate('/new-board')}
                        className="bg-blue-500 text-white rounded px-4 py-2"
                    >
                        Create Post
                    </button>
                ) : (
                    <>
                        <button
                            onClick={() => navigate('/register')}
                            className="bg-blue-500 text-white rounded px-4 py-2 mr-4"
                        >
                            Register
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-blue-500 text-white rounded px-4 py-2"
                        >
                            Login
                        </button>
                    </>
                )}
            </div>
            <ul className="space-y-4">
                {posts.map(post => (
                    <li key={post.id} className="border rounded p-4">
                        <Link to={`/board/${post.id}`} className="text-blue-500 hover:underline">
                            <h2 className="text-2xl font-bold">{post.title}</h2>
                        </Link>
                        <p>By {post.writer} | {post.likeCount} likes | {post.viewCount} views | {post.commentCount} comments</p>
                        <p>{new Date(post.createdAt).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
            <div className="mt-4">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="mr-4 bg-gray-300 rounded px-4 py-2"
                >
                    Previous
                </button>
                <button
                    onClick={() => setPage(page + 1)}
                    className="bg-gray-300 rounded px-4 py-2"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default BoardListPage;
