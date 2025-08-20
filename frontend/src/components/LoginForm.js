import { Formik, Form, Field, ErrorMessage } from 'formik';
import { validateEmail, validatePassword } from '../utils/validate';
import { Link } from 'react-router-dom';

const LoginForm = () => {
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
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                });
            }}
        >
            {({ isSubmitting }) => (
                <Form className="flex flex-col mx-auto py-4 px-6 gap-7 w-full sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] relative">
                    <div className="flex flex-col items-center cursor-default">
                        <span className="font-bold text-xl text-center">Log in Form</span>
                        <span className="font-semibold">New to website? <Link to="/signup" className='underline'>Click to Sign up</Link></span>
                    </div>
                    <div className="flex flex-col w-full relative">
                        <label className="w-fit" htmlFor="username">Username <span className="text-red-700">*</span></label>
                        <Field id="username" type="text" autoComplete="username" name="username" className="px-1 w-full border-2 border-white focus:border-black bg-white text-center rounded" />
                        <ErrorMessage name="username" component="div" className="absolute top-full leading-none text-[smaller] w-full text-red-700 italic" />
                    </div>
                    <div className="flex flex-col w-full relative">
                        <label className="w-fit" htmlFor="password">Password <span className="text-red-700">*</span></label>
                        <Field id="password" type="password" autoComplete="new-password" name="password" className="px-1 w-full border-2 border-white focus:border-black bg-white text-center rounded" />
                        <ErrorMessage name="password" component="div" className="absolute top-full leading-none text-[smaller] w-full text-red-700 italic" />
                    </div>
                    <div className='flex justify-end'>
                        <button type="submit" disabled={isSubmitting} className="bg-[#fedf4b] px-2 rounded border-2 hover:border-black border-transparent box-border h-8 w-fit cursor-pointer">Log in</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
};

export default LoginForm;