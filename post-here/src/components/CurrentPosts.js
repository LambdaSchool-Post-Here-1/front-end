import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const CurrentPosts = () => {
    const [posts, setPosts] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axiosWithAuth()
            .get('/api/reddit')
            .then(res => {
                console.log(res);
                setPosts(res.data);
            })
            .catch(err => console.log(err))
    }, [posts]);

    return (
        <div className='posts-container'>
            
            {posts && posts.map(post => {
                return (
                    <div className='post'>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <button id='delete'>Delete Post</button>
                    </div>)
            })}
        </div>
    )
};

export default CurrentPosts;