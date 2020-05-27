import * as yup from 'yup';
const loginSchema = yup.object().shape({
    username: yup.string()
    .trim()
    .required('Must have a username'),
    password: yup.string()
    .trim()
    .required('Must have a password')
})
export default loginSchema