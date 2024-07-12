import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import AdminLayout from "./pages/layouts/AdminLayout";

const routes = (
    <Route path="/" element={<AdminLayout />}>

    </Route>
);

export const router = createBrowserRouter(
    createRoutesFromElements(routes)
);