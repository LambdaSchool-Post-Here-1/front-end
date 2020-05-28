import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const CurrentPosts = () => {
    const [posts, setPosts] = useState([]);
    const { id } = useParams();
    // const [postsLength, setPostsLength] = useState(0);

    useEffect(() => {
        getSavedData();
    }, []);

    const getSavedData = () => {
        axiosWithAuth()
        .get('/api/reddit')
        .then(res => {
            console.log(res);
            setPosts(res.data);         
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