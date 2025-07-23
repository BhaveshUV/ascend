import { useNavigate } from "react-router-dom";
import { ALL_LISTINGS_URL } from "../utils/constants";
import { Formik, Form, Field, ErrorMessage } from 'formik';

const ListingForm = ({ listing, setIsForm }) => {
    if (!listing) {
        listing = {};
    }

    const navigate = useNavigate();

    let editHandler = async (values) => {
        let { title, description, image, price, location, country } = values;
        let updatedForm = { title, description, image, price, location, country };
        try {
            const response = await fetch(`${ALL_LISTINGS_URL}/${listing._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedForm)
            });
            if (response.ok) {
                navigate(0);
                setIsForm(false);
                window.alert("Update successful");
            } else {
                const error = await response.json();
                window.alert("Error updating the listing: ", error);
            }
        } catch (e) {
            window.alert("Request failed: ", e);
        }
    }

    let createHandler = async (values) => {
        let { title, description, image, price, location, country } = values;
        document.getElementById("create-btn").disabled = true;
        let form = { title, description, image, price, location, country, by: "Default-user" };
        try {
            const response = await fetch(ALL_LISTINGS_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });
            if (response.ok) {
                navigate(-1);
                window.alert("Listing created successfully")
                return;
            }
            let err = await response.json();
            console.log(err);
            window.alert(err.error);
        } catch (e) {
            window.alert("Request failed: ", e);
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

    return (
        <Formik
            initialValues={{ title: listing.title || '', description: listing.description || '', image: listing.image || '', price: listing.price || '', location: listing.location || '', country: listing.country || '' }}
            validate={values => {
                const errors = {};
                if (!values.title) {
                    errors.title = 'Required';
                } if (!values.description) {
                    errors.description = 'Required';
                } if (listing._id && !values.image) {
                    errors.image = 'Required';
                } if (values.price <= 0) {
                    errors.price = 'Enter a valid amount';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    listing._id ? editHandler(values) : createHandler(values);
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({ isSubmitting }) => (
                <Form className="flex flex-col mx-auto py-4 px-6 gap-6 w-full sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] relative">
                    <div onClick={() => { setIsForm ? setIsForm(false) : navigate(-1) }} className="absolute right-1 top-2 sm:right-6 h-6 w-6 border-3 rounded-full cursor-pointer flex flex-col justify-center items-center">
                        <span className="absolute rotate-45 border-b-3 w-[0.8rem]"></span>
                        <span className="absolute -rotate-45 border-b-3 w-[0.8rem]"></span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="font-bold text-xl text-center">{listing.by || "Default User"}</span>
                        <span className="font-semibold">{listing._id ? "Edit your Listing" : "Create your Listing"}</span>
                    </div>
                    <div className="flex flex-col w-full relative">
                        <label className="w-fit" htmlFor="title">Title <span className="text-red-700">*</span></label>
                        <Field id="title" type="text" name="title" className="px-1 w-full border-2 border-white focus:border-black bg-white text-center rounded" />
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
                        <label className="w-fit" htmlFor="amount">Amount(₹) <span className="text-red-700">*</span></label>
                        <Field id="amount" type="number" name="price" onWheel={preventWheel} className="text-gray-700 px-1 w-full border-2 border-white focus:border-black bg-white text-center rounded" />
                        <ErrorMessage name="price" component="span" className="absolute -bottom-3.5 leading-none text-[smaller] w-full text-red-700 italic" />
                    </div>
                    <div className="flex flex-col w-full h-max">
                        <label className="w-fit" htmlFor="location">Location</label>
                        <Field id="location" type="text" name="location" className="text-gray-700 px-1 w-full border-2 border-white focus:border-black bg-white text-center rounded" />
                    </div>
                    <div className="flex flex-col w-full h-max">
                        <label className="w-fit" htmlFor="country">Country</label>
                        <Field id="country" type="text" name="country" className="text-gray-700 px-1 w-full border-2 border-white focus:border-black bg-white text-center rounded" />
                    </div>
                    <div className="mx-auto w-fit">
                        <button type="submit" disabled={isSubmitting} id="create-btn" className="bg-[#fedf4b] px-2 mx-2 rounded hover:border-2 box-border h-8 w-16 cursor-pointer">Save</button>
                        <button type="button" onClick={() => { setIsForm ? setIsForm(false) : navigate(-1) }} className="bg-zinc-200 px-2 mx-2 rounded hover:border-2 box-border h-8 w-20 cursor-pointer">Cancel</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default ListingForm;