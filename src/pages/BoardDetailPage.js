import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../Api';

const BoardDetailPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState('');
    const [replyTo, setReplyTo] = useState(null);
    const [newComment, setNewComment] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/board/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPost();
    }, [id, newComment]);

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        try {
            // 대댓글인 경우 parentId 지정
            const data = replyTo ? { content: comment, parentId: replyTo } : { content: comment };
            await api.post(`/comments/${id}/comments`, data);
            setComment('');
            setReplyTo(null);
            setNewComment(Date.now());
        } catch (error) {
            console.error(error);
        }
    };

    const handleReplyTo = (commentId) => {
        setReplyTo(commentId);
    };

    const renderComments = (comments) => {
        return (
            <ul className="pl-5 list-none">
                {comments.map(comment => (
                    <li key={comment.id} className="mb-4">
                        <div>
                            <p className="mb-1">{comment.content}</p>
                            <p>By {comment.writer}</p>
                            <button onClick={() => handleReplyTo(comment.id)} className="text-blue-500">Reply</button>
                        </div>
                        {/* 대댓글 입력 폼 */}
                        {replyTo === comment.id && (
                            <form onSubmit={handleSubmitComment} className="pl-5">
                                <textarea
                                    value={comment.content}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Write your reply"
                                    required
                                    className="border mb-2 w-full"
                                ></textarea>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2">Submit</button>
                            </form>
                        )}
                        {/* 재귀적으로 대댓글 표시 */}
                        {comment.children && renderComments(comment.children)}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div>
            {post ? (
                <div>
                    <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
                    <p className="mb-4">{post.content}</p>
                    <p>By {post.writer}</p>
                    <p>Views: {post.viewCount}</p>
                    <p>Likes: {post.likeCount}</p>
                    <p>Comments: {post.commentCount}</p>
                    {/* 댓글 입력 폼 */}
                    <form onSubmit={handleSubmitComment} className="mb-4">
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Write your comment"
                            required
                            className="border mb-2 w-full"
                        ></textarea>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Submit</button>
                    </form>
                    {/* 댓글 및 대댓글 표시 */}
                    {renderComments(post.comments)}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default BoardDetailPage;
