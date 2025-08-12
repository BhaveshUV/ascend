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

let appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
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
root.render(<FlashContextProvider><RouterProvider router={appRouter} /></FlashContextProvider>);