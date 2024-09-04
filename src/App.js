import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"; // Fix import here
import MainLayout from "./components/MainLayout";
import AddBlog from "./pages/AddBlog";
import AddBlogCategory from "./pages/AddBlogCategory";
import AddBrand from "./pages/AddBrand";
import AddCategory from "./pages/AddCategory";
import AddColor from "./pages/AddColor";
import AddCoupons from "./pages/AddCoupons";
import AddProduct from "./pages/AddProduct";
import BlogCategory from "./pages/BlogCategory";
import BlogList from "./pages/BlogList";
import BrandList from "./pages/BrandList";
import CategoryList from "./pages/CategoryList";
import ColorList from "./pages/ColorList";
import Coupons from "./pages/Coupons";
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import Enquires from "./pages/Enquires";
import Forget from "./pages/Forget";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import ProductList from "./pages/ProductList";
import Reset from "./pages/Reset";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="product" element={<AddProduct />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="brand" element={<AddBrand />} />
          <Route path="brand-list" element={<BrandList />} />
          <Route path="category" element={<AddCategory />} />
          <Route path="category-list" element={<CategoryList />} />
          <Route path="color" element={<AddColor />} />
          <Route path="color-list" element={<ColorList />} />
          <Route path="blog" element={<AddBlog />} />
          <Route path="blog-list" element={<BlogList />} />
          <Route path="blog-category" element={<AddBlogCategory />} />
          <Route path="blog-category-list" element={<BlogCategory />} />
          <Route path="coupon" element={<AddCoupons />} />
          <Route path="coupon-list" element={<Coupons />} />
          <Route path="orders" element={<Orders />} />
          <Route path="Customers" element={<Customers />} />
          <Route path="enquires" element={<Enquires />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
