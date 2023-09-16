import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slice/users/usersSlice";
import productReducer from "../slice/products/productSlices";
import categoryReducer from "../slice/categories/categoriesSlice";
import brandsReducer from "../slice/categories/brandsSlice";
import colorsReducer from "../slice/categories/colorsSlice";
import cartReducer from "../slice/cart/cartSlice";
import couponsReducer from "../slice/coupons/couponsSlice";

//create a store

const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productReducer,
    categories: categoryReducer,
    brands: brandsReducer,
    colors: colorsReducer,
    carts: cartReducer,
    coupons: couponsReducer,
  },
});

export default store;
