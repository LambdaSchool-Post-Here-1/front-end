import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import CurrentPosts from './CurrentPosts';

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
    },[])

    const getData = () => {
        axiosWithAuth()
            .get('/api/reddit')
            .then(res => {
                console.log(res.data);
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
        <>
            <form className='post-input-form'>
                <h2>Create a new Reddit post!</h2>

                <div className='tips-tricks'>
                    <h3>Tips & Tricks</h3>
                    
                        <h4>Remember to make your Reddit post thorough</h4>
                        <h4>Specify which platform you're working with</h4>

                </div>

                {/* ///////////// TEXT INPUTS /////////// */}
                <label for='title'>Title:</label>
                    <input    
                        id='title'
                        value={formValues.postTitle}
                        onChange={onInputChange}
                        name='postTitle'
                        type='text'
                    />
                <h4 className="errors">{formErrors.postTitle}</h4>

                <label for='content'>Content:</label>
                    <textarea
                        id='content'
                        value={formValues.postContent}
                        onChange={onInputChange}
                        name='postContent'
                        type='text'
                    />

                </label>
                <h4 className="errors">{formErrors.postContent}</h4>
                <button onClick={onSubmit} disabled={formDisabled} id='submit' >Submit</button>
            </form>
            <CurrentPosts />
        </>
    );
};

export default PostInput;