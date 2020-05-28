import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const CurrentPosts = ({ posts }) => {

    useEffect(() => {
        getSavedData();
    }, []);

    const getSavedData = () => {
        axiosWithAuth()
        .get('/api/reddit')
        .then(res => {
            console.log(res);     
        })
        .catch(err => console.log(err))
    };

    const deletePost = (e, post) => {
        e.preventDefault();

        axiosWithAuth()
            .delete(`/api/reddit/${post.id}`)
            .then(res => {
                console.log(res);
                getSavedData();
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='posts-container'>
            <h3>Current Reddit Posts</h3>
            
            {posts && posts.map((post, index) => {
                return (
                    <div key={index} className='post'>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <button id='delete' 
                        onClick={(e) => deletePost(e, post)}
                        >Delete Post</button>
                    </div>)
            })}
        </div>
    )
};

export default CurrentPosts;