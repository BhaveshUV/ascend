import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from "../utils/validate";
import { SIGNUP_URL } from '../utils/constants';
import { useContext } from 'react';
import { FlashContext } from '../contexts/FlashContextProvider';
import { AuthContext } from '../contexts/AuthContextProvider';

const SignupForm = () => {
    const navigate = useNavigate();
    const { setFlashMessage } = useContext(FlashContext);
    const { currUser, setCurrUser } = useContext(AuthContext);

    const signupHandler = async (values) => {
        try {
            const response = await fetch(SIGNUP_URL, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            });
            const data = await response.json();
            if (response.ok) {
                console.dir(data.user);
                setFlashMessage('success', data.message + "! Welcome to Ascend");
                setCurrUser(data.user);
                navigate(-1);
                return;
            }
            setFlashMessage('error', data.error || 'Sign up failed');
            if(currUser) setCurrUser(null);
        } catch (e) {
            setFlashMessage('error', 'Request failed:' + e.message);
            if(currUser) setCurrUser(null);
        }
    }

    return (
        <Formik
            initialValues={{ email: '', username: '', password: '' }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (!validateEmail(values.email)) {
                    errors.email = 'Invalid email address';
                } if (!values.username) {
                    errors.username = 'Required';
                } if (!values.password) {
                    errors.password = 'Required';
                } else if (!validatePassword(values.password)) {
                    errors.password = 'Password must contain at least 8 characters | ABC | abc | 123 | @#$%';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(() => {
                    signupHandler(values);
                    setSubmitting(false);
                    resetForm();
                });
            }}
        >
            {({ isSubmitting }) => (
                <Form className="flex flex-col mx-auto py-4 px-6 gap-7 w-full sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] relative">
                    <div className="flex flex-col items-center cursor-default">
                        <span className="font-bold text-xl text-center">Sign up Form</span>
                        <span className="font-medium flex flex-wrap justify-center gap-1 leading-none"><span>Already a user?</span><Link to="/login" className='underline'>Click to Log in</Link></span>
                    </div>
                    <div className="flex flex-col w-full relative">
                        <label className="w-fit" htmlFor="username">Username <span className="text-red-700">*</span></label>
                        <Field id="username" type="text" autoComplete="username" name="username" className="px-1 w-full border-2 border-white focus:border-black bg-white text-center rounded" />
                        <ErrorMessage name="username" component="div" className="absolute top-full leading-none text-[smaller] w-full text-red-700 italic" />
                    </div>
                    <div className="flex flex-col w-full relative">
                        <label className="w-fit" htmlFor="email">Email <span className="text-red-700">*</span></label>
                        <Field id="email" type="email" autoComplete="email" name="email" className="px-1 w-full border-2 border-white focus:border-black bg-white text-center rounded" />
                        <ErrorMessage name="email" component="div" className="absolute top-full leading-none text-[smaller] w-full text-red-700 italic" />
                    </div>
                    <div className="flex flex-col w-full relative">
                        <label className="w-fit" htmlFor="password">Password <span className="text-red-700">*</span></label>
                        <Field id="password" type="password" autoComplete="new-password" name="password" className="px-1 w-full border-2 border-white focus:border-black bg-white text-center rounded" />
                        <ErrorMessage name="password" component="div" className="absolute top-full leading-none text-[smaller] w-full text-red-700 italic" />
                    </div>
                    <div className='flex justify-end'>
                        <button type="submit" disabled={isSubmitting} className="bg-[#fedf4b] px-2 rounded border-2 hover:border-black border-transparent box-border h-8 w-fit cursor-pointer">Sign up</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default SignupForm;