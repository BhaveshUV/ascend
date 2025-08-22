import { useParams, useNavigate } from "react-router-dom";
import { ALL_LISTINGS_URL } from "../utils/constants";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FlashContext } from "../contexts/FlashContextProvider";
import { AuthContext } from "../contexts/AuthContextProvider";
import { useContext } from "react";

const ReviewForm = ({ setRefreshListing }) => {
    const { id } = useParams();
    const { setFlashMessage } = useContext(FlashContext);
    const { currUser, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    let createHandler = async (values) => {
        let { rating, review } = values;
        let form = { rating, review, by: "Default-user" };
        try {
            const response = await fetch(ALL_LISTINGS_URL + `/${id}/reviews`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });
            if (response.ok) {
                setRefreshListing(prev => !prev);
                setFlashMessage("success", "Review added successfully")
                return;
            }
            let err = await response.json();
            console.dir(err);
            if(err.error === "You are not logged in") navigate("/login");
            setFlashMessage("error", err.error);
        } catch (e) {
            console.dir(e);
            setFlashMessage("error", "Request failed: " + e);
        }
    }

    return (
        <div className="m-auto py-4 w-full flex flex-col items-center cursor-default bg-zinc-800 text-white ">

            <Formik
                initialValues={{ rating: "3", review: "" }}
                validate={values => {
                    const errors = {};
                    if (!values.review) {
                        errors.review = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    if(!loading && !currUser) {
                        setFlashMessage("error", "You are not logged in");
                        setSubmitting(false);
                        navigate("/login");
                        return;
                    }
                    alert("You've submitted: " + JSON.stringify(values, null, 2));
                    createHandler(values);
                    setSubmitting(false);
                    resetForm();
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="w-full md:w-[50%] px-6 flex flex-col gap-6">
                        <span className="h-10 w-full"></span>
                        <span className="font-bold text-xl text-center sticky bottom-2">DROP A FEEDBACK</span>
                        <div className="flex flex-col relative">
                            <label className="w-fit" htmlFor="rating">Rating <span className="text-red-400">*</span></label>
                            <Field id="rating" type="range" min="1" max="5" name="rating" className="text-gray-700 px-1 w-full border-2 border-white focus:border-black bg-white text-center rounded"></Field>
                        </div>
                        <div className="flex flex-col relative">
                            <label className="w-fit" htmlFor="review">Review <span className="text-red-400">*</span></label>
                            <Field as="textarea" rows="4" id="review" type="text" name="review" className="text-black px-1 w-full border-2 focus:border-black bg-zinc-200 text-center rounded"></Field>
                            <ErrorMessage name="review" component="span" className="absolute -bottom-3.5 leading-none text-[smaller] w-full text-red-400 italic" />
                        </div>
                        <div>
                            <button type="submit" disabled={isSubmitting} className="rounded px-2 border-2 box-border hover:border-white h-7 bg-[#fedf4b] text-zinc-800 cursor-pointer">Submit</button>
                        </div>
                        <span className="h-10 w-full"></span>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ReviewForm;