import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';
import styled from 'styled-components';
import { axiosWithAuth } from '../utils/axiosWithAuth';

/////////// VARIABLES ///////////////
const postUrl = 'https://post-here-heroku.herokuapp.com/api/reddit';

//////////// INITIAL FORM VALUES ////////////
const initialFormValues = {
    postTitle: '',
    postContent: ''
};

//////////// SHAPE OF VALIDATION ERRORS OBJECT //////////////
const initialFormErrors = {
    postTitle: '',
    postContent: ''
};

///////////// FORM SCHEMA FOR VALIDATION ////////////////
const formSchema = yup.object().shape({
    postTitle: yup
        .string()
        .required('A title for your post is required...'),
    postContent: yup
        .string()
        .required('Content for your post is required...')
});

const PostInput = () => {
    const [formDisabled, setFormDisabled] = useState(false);
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getData();
    },[posts])

    const getData = () => {
        axiosWithAuth()
            .get('/api/reddit')
            .then(res => {
                console.log(res);
                setPosts(res.data);
            })
            .catch(err => console.log(err))
    };

    const createPost = (newPost) => {
        axiosWithAuth()
            .post('/api/reddit', newPost)
            .then(res => {
                console.log(res);
                setPosts([...posts, newPost])
            })
            .catch(err => console.log(err))
    }

    const onInputChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        yup
            .reach(formSchema, name)
            .validate(value)

            .then(valid => {
                // CLEAR ERROR
                setFormErrors({
                    ...formErrors,
                    [name]: ''
                });
            })
            .catch(err => {
                setFormErrors({
                    ...formErrors,
                    [name]: err.errors[0]
                });
            })

        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const onSubmit = e => {
        e.preventDefault();

        const newPost = {
            title: formValues.postTitle,
            content: formValues.postContent
        };

        createPost(newPost);
        setFormValues(initialFormValues);
        getData();
    };

    return (
        <form className='post-input-form'>
            <h2>Create a new Reddit post!</h2>

            {/* ///////////// TEXT INPUTS /////////// */}
            <label>Title:&nbsp;
                <input    
                    value={formValues.postTitle}
                    onChange={onInputChange}
                    name='postTitle'
                    type='text'
                />
            </label>
            <h3>{formErrors.postTitle}</h3>
            &nbsp;&nbsp;&nbsp; {/* spacing between input fields */}

            <label>Email:&nbsp;
                <input 
                    value={formValues.postContent}
                    onChange={onInputChange}
                    name='postContent'
                    type='text'
                />
            </label>
            <h3>{formErrors.postContent}</h3>

            <button onClick={onSubmit} disabled={formDisabled} id='submit' >Submit</button>
        </form>
    );
};

export default PostInput;