// No need to import React when using React 17 or later
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllListings from "./components/AllListings";
import Error from "./components/Error";
import Listing from "./components/Listing";
import ListingForm from "./components/ListingForm";
import listingLoader from "./loaders/listingLoader";

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
                loader: listingLoader
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);