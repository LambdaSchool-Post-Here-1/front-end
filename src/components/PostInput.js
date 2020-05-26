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

    const getData = () => {
        axiosWithAuth()
            .get('/api/reddit')
            .then(res => {
                console.log(res);
                setPosts(res.data);
            })
            .catch(err => console.log(err))
    };

};

export default PostInput;