import { combineReducers } from "@reduxjs/toolkit";
import AuthSlice from "../Slices/AuthSlice";
import CartSlice from "../Slices/CartSlice";
const rootReducer=combineReducers({
    auth:AuthSlice,
    cart: CartSlice
})
export default rootReducer;
