import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const CurrentPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axiosWithAuth()
            .get('/api/reddit')
            .then(res => {
                console.log(res);
                setPosts(res.data);
            })
            .catch(err => console.log(err))
    });

    return (
        <div className='posts-container'>
            {posts && posts.forEach(post => {
                return (
                    <div>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                    </div>)
            })}
        </div>
    )
};

export default CurrentPosts;