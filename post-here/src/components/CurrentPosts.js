import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const CurrentPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axiosWithAuth()
            .get('/api/reddit')
            .then(res => {
                const postLength = posts.length;
                console.log(res);
                // if ()
                setPosts(res.data);
            })
            .catch(err => console.log(err))
    }, [posts.length]);

    return (
        <div className='posts-container'>
            
            {posts && posts.map(post => {
                return (
                    <div className='post'>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                    </div>)
            })}
        </div>
    )
};

export default CurrentPosts;