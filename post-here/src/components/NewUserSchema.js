import * as yup from 'yup';
const loginSchema = yup.object().shape({
    username: yup.string()
    .trim()
    .required('Must have a username'),
    email: yup.string()
    .email('The email must be a valid email')
    .required('Must have an email'),
    password: yup.string()
    .trim()
    .required('Must have a password')
})
export default loginSchema