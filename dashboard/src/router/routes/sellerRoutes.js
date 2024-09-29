import { lazy } from "react";

const Home = lazy(() => import("../../views/Home"));
const SellerDashboard = lazy(() =>
  import("../../views/seller/SellerDashboard")
);
const Orders = lazy(() => import("../../views/seller/Orders"));
const AddProduct = lazy(() => import("../../views/seller/AddProduct"));
const Products = lazy(() => import("../../views/seller/Products"));
const DiscountProducts = lazy(() =>
  import("../../views/seller/DiscountProducts")
);
const Payments = lazy(() => import("../../views/seller/Payments"));

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
  {
    path: "seller/dashboard/products",
    element: <Products />,
    role: "seller",
  },
  {
    path: "seller/dashboard/discount-products",
    element: <DiscountProducts />,
    role: "seller",
  },
  {
    path: "seller/dashboard/payments",
    element: <Payments />,
    role: "seller",
  },
];

export default sellerRoutes;
