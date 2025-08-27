import { useNavigate } from "react-router-dom";
import { ALL_LISTINGS_URL } from "../utils/constants";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FlashContext } from "../contexts/FlashContextProvider";
import { AuthContext } from "../contexts/AuthContextProvider";
import { useContext, useEffect, useState } from "react";

const ListingForm = ({ listingData, setRefreshListing, setIsForm }) => {
    let listing = {};
    if (listingData) {
        listing = listingData;
        console.log(listing);
    }

    const navigate = useNavigate();
    const { setFlashMessage } = useContext(FlashContext);
    const { currUser, loading } = useContext(AuthContext);
    const [preview, setPreview] = useState(null);

    let editHandler = async (values) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("image", values.image);
        if (values.imageFile) formData.append("imageFile", imageFile.files[0]);
        formData.append("price", values.price);
        formData.append("location", values.location);
        formData.append("country", values.country);
        try {
            const response = await fetch(`${ALL_LISTINGS_URL}/${listing._id}`, {
                method: "PATCH",
                credentials: "include",
                body: formData
            });
            if (response.ok) {
                setRefreshListing(prev => !prev);
                setIsForm(false);
                setFlashMessage("success", "Update successful");
            } else {
                const error = await response.json();
                console.dir(error);
                if (error.error === "You are not logged in") navigate("/login");
                setFlashMessage("error", error.error);
            }
        } catch (e) {
            setFlashMessage("error", "Request failed: ", e);
        }
    }

    let createHandler = async (values) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("image", values.image);
        if (values.imageFile) formData.append("imageFile", imageFile.files[0]);
        formData.append("price", values.price);
        formData.append("location", values.location);
        formData.append("country", values.country);

        try {
            const response = await fetch(ALL_LISTINGS_URL, {
                method: "POST",
                credentials: "include",
                body: formData
            });
            if (response.ok) {
                navigate(-1);
                setFlashMessage("success", "Listing created successfully")
                return;
            }
            let err = await response.json();
            console.dir(err);
            if (err.error === "You are not logged in") navigate("/login");
            setFlashMessage("error", err.error);
        } catch (e) {
            console.dir(e);
            setFlashMessage("error", "Request failed: " + e);
        }
    }

    let preventWheel = (e) => {
        // Prevent the input value change
        e.target.blur();
        e.target.style.border = "2px solid black";

        // Refocus immediately, on the next tick (after the current function is done)
        setTimeout(() => {
            e.target.focus();
            e.target.style.border = "";
        }, 0)
    }

    useEffect(() => {
        if (!loading && !currUser) setFlashMessage("error", "Log in to create, edit and delete");
        if (!loading && currUser && listing._id && (currUser._id !== listing.by._id)) setFlashMessage("error", "You do not have permission for this listing");
    }, [])

    return (
        <Formik
            initialValues={{ title: listing.title || '', description: listing.description || '', image: listing.image || '', imageFile: '', price: listing.price || '', location: listing.location || '', country: listing.country || '' }}
            validate={values => {
                const errors = {};
                if (!values.title) {
                    errors.title = 'Required';
                } if (!values.description) {
                    errors.description = 'Required';
                } if (listing._id && !values.image) {
                    errors.image = 'Required';
                }
                // if (!values.imageFile) {
                //     errors.imageFile = 'Required';
                // } 
                if (!values.price && values.price != '0') {
                    errors.price = 'Required';
                } else if (values.price <= 0) {
                    errors.price = 'Enter a valid amount';
                } if (!values.location) {
                    errors.location = 'Required';
                } if (!values.country) {
                    errors.country = 'Required';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                alert("You've submitted: " + JSON.stringify(values, null, 2));
                listing._id ? editHandler(values) : createHandler(values);
                setSubmitting(false);
            }}
        >
            {({ isSubmitting, handleChange, setFieldValue }) => (
                <Form className="flex flex-col mx-auto py-4 px-6 gap-6 w-full sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] relative cursor-default">
                    <div onClick={() => { setIsForm ? setIsForm(false) : navigate(-1) }} className="absolute right-1 top-2 sm:right-6 h-6 w-6 border-3 rounded-full cursor-pointer flex flex-col justify-center items-center">
                        <span className="absolute rotate-45 border-b-3 w-[0.8rem]"></span>
                        <span className="absolute -rotate-45 border-b-3 w-[0.8rem]"></span>
                    </div>
                    <div className="flex flex-col items-center">
                        {
                            listing._id ? <>
                                <span className="font-bold text-xl text-center">{listing.by.username}</span>
                                <span className="font-semibold">Edit your Listing</span>
                            </>
                                : loading ? <span className="font-bold text-xl text-center opacity-0">Loading user</span>
                                    : !currUser ? <>
                                        <span className="font-bold text-xl text-center">You are not logged in</span>
                                        <span className="font-semibold">You can't create a Listing</span>
                                    </> : <>
                                        <span className="font-bold text-xl text-center">{currUser.username}</span>
                                        <span className="font-semibold">Create your Listing</span>
                                    </>
                        }
                    </div>
                    <div className="flex flex-col w-full relative">
                        <label className="w-fit" htmlFor="title">Title <span className="text-red-700">*</span></label>
                        <Field id="title" type="text" name="title" className="text-gray-700 px-1 w-full border-2 border-white focus:border-black bg-white text-center rounded" />
                        <ErrorMessage name="title" component="span" className="absolute -bottom-3.5 leading-none text-[smaller] w-full text-red-700 italic" />
                    </div>
                    <div className="flex flex-col w-full h-max relative">
                        <label className="w-fit" htmlFor="description">Description <span className="text-red-700">*</span></label>
                        <Field as="textarea" rows="6" id="description" type="text" name="description" className="text-gray-700 px-1 w-full border-2 border-white focus:border-black bg-white text-center rounded" />
                        <ErrorMessage name="description" component="span" className="absolute -bottom-3.5 leading-none text-[smaller] w-full text-red-700 italic" />
                    </div>
                    <div className="flex flex-col w-full h-max relative">
                        <label className="w-fit" htmlFor="imgURL">Image URL {listing._id ? <span className="text-red-700">*</span> : null}</label>
                        <Field id="imgURL" type="text" name="image" className="text-gray-700 px-1 w-full border-2 border-white focus:border-black bg-white text-center rounded" />
                        {listing._id ? <ErrorMessage name="image" component="span" className="absolute -bottom-3.5 leading-none text-[smaller] w-full text-red-700 italic" /> : null}
                    </div>
                    <div className="flex flex-col w-full h-max relative">
                        <label className="w-fit" htmlFor="imageFile">{listing._id ? "Upload New Image" : "Upload Image"}</label>
                        <Field onChange={(e) => {
                            const file = e.currentTarget.files[0];
                            file ? setPreview(URL.createObjectURL(file)) : setPreview(null);
                            setFieldValue("imageFile", file);
                            console.log(file);
                            handleChange(e);
                        }} id="imageFile" type="file" name="imageFile" className="text-gray-500 px-1 w-full border-2 border-white active:border-black bg-white text-center rounded" />
                        {listing._id ? <ErrorMessage name="imageFile" component="span" className="absolute -bottom-3.5 leading-none text-[smaller] w-full text-red-700 italic" /> : null}
                        {preview && <>
                            <span className="text-sm text-gray-500">You've chosen the following file</span>
                            <img src={preview} alt="preview" />
                        </>
                        }
                    </div>
                    <div className="flex flex-col w-full h-max relative">
                        <label className="w-fit" htmlFor="amount">Amount(₹) <span className="text-red-700">*</span></label>
                        <Field id="amount" type="number" name="price" onWheel={preventWheel} className="text-gray-700 px-1 w-full border-2 border-white focus:border-black bg-white text-center rounded" />
                        <ErrorMessage name="price" component="span" className="absolute -bottom-3.5 leading-none text-[smaller] w-full text-red-700 italic" />
                    </div>
                    <div className="flex flex-col w-full h-max relative">
                        <label className="w-fit" htmlFor="location">Location <span className="text-red-700">*</span></label>
                        <Field id="location" type="text" name="location" className="text-gray-700 px-1 w-full border-2 border-white focus:border-black bg-white text-center rounded" />
                        <ErrorMessage name="location" component="span" className="absolute -bottom-3.5 leading-none text-[smaller] w-full text-red-700 italic" />
                    </div>
                    <div className="flex flex-col w-full h-max relative">
                        <label className="w-fit" htmlFor="country">Country <span className="text-red-700">*</span></label>
                        <Field id="country" type="text" name="country" autoComplete="country-name" className="text-gray-700 px-1 w-full border-2 border-white focus:border-black bg-white text-center rounded" />
                        <ErrorMessage name="country" component="span" className="absolute -bottom-3.5 leading-none text-[smaller] w-full text-red-700 italic" />
                    </div>
                    <div className="mx-auto w-fit">
                        <button type="submit" disabled={isSubmitting} className="bg-[#fedf4b] px-2 mx-2 rounded hover:border-2 box-border h-8 w-16 cursor-pointer">Save</button>
                        <button type="button" onClick={() => { setIsForm ? setIsForm(false) : navigate(-1) }} className="bg-zinc-200 px-2 mx-2 rounded hover:border-2 box-border h-8 w-20 cursor-pointer">Cancel</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default ListingForm;