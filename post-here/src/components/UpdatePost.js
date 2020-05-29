import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialPost = {
    title: '',
    content: ''
};

const UpdatePost = () => {
    const { push } = useHistory();
    const { id } = useParams();
    const [post, setPost] = useState(initialPost);

    // useEffect(() => {
    //     axiosWithAuth()
    //         .get(`/api/reddit/`)
    // })

    const changeHandler = (e) => {
        e.persist();
        let value = e.target.value;
        
        setPost({
            ...post,
            [e.target.name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        axiosWithAuth()
            .put(`https://reqres.in/api/users/${id}`, post)
            .then(res => {
                console.log(res);
                setPost(res.data)
                push('/post-input');
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h2>Update Post</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    onChange={changeHandler}
                    placeholder='title'
                    value={post.title}
                />
                <input
                    type='text'
                    name='content'
                    onChange={changeHandler}
                    placeholder='content'
                    value={post.content}
                />
                <button>Update</button>
            </form>
        </div>
    )
};

export default UpdatePost;