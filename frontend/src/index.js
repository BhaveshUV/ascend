// No need to import React when using React 17 or later
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllListings from "./components/AllListings";
import Error from "./components/Error";
import Listing from "./components/Listing";
import ListingForm from "./components/ListingForm";
import FlashContextProvider from "./contexts/FlashContextProvider";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import AuthContextProvider from "./contexts/AuthContextProvider";

let appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: "/login",
                element: <LoginForm />,
            },
            {
                path: "/signup",
                element: <SignupForm />,
            },
            {
                path: "/listings",
                element: <AllListings />
            },
            {
                path: "/listings/new",
                element: <ListingForm />
            },
            {
                path: "/listings/:id",
                element: <Listing />,
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <FlashContextProvider>
        <AuthContextProvider>
            <RouterProvider router={appRouter} />
        </AuthContextProvider>
    </FlashContextProvider>
);