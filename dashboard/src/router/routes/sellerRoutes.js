import { lazy } from "react";

const Home = lazy(() => import("../../views/Home"));
const SellerDashboard = lazy(() =>
  import("../../views/seller/SellerDashboard")
);
const Orders = lazy(() => import("../../views/seller/Orders"));
const AddProduct = lazy(() => import("../../views/seller/AddProduct"));

const sellerRoutes = [
  {
    path: "/",
    element: <Home />,
    ability: ["admin", "seller"],
  },
  {
    path: "seller/dashboard",
    element: <SellerDashboard />,
    role: "seller",
  },
  {
    path: "seller/dashboard/add-product",
    element: <AddProduct />,
    role: "seller",
  },
  {
    path: "seller/dashboard/orders",
    element: <Orders />,
    role: "seller",
  },
];

export default sellerRoutes;
