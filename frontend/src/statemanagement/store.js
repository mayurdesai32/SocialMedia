import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// import {
//   productsReducer,
//   newProductReducer,
//   productReducer,
//   productDetailsReducer,
//   newReviewReducer,
//   productReviewsReducer,
//   reviewReducer,
// } from "./reducers/productReducers";
import {
  authReducer,
  // userReducer,
  // forgotPasswordReducer,
  // allUsersReducer,
  // userDetailsReducer,
} from "./reducer/userReducer";

import { allPostReducer } from "./reducer/postReducer";

const reducer = combineReducers({
  // products: productsReducer,
  // productDetails: productDetailsReducer,
  // newProduct: newProductReducer,
  // product: productReducer,
  // productReviews: productReviewsReducer,
  // review: reviewReducer,
  auth: authReducer,
  allPost: allPostReducer,
  // user: userReducer,
  // allUsers: allUsersReducer,
  // userDetails: userDetailsReducer,
  // forgotPassword: forgotPasswordReducer,
  // cart: cartReducer,
  // newOrder: newOrderReducer,
  // myOrders: myOrdersReducer,
  // allOrders: allOrdersReducer,
  // orderDetails: orderDetailsReducer,
  // order: orderReducer,
  // newReview: newReviewReducer,
});

let initialState = {
  auth: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {},
  },
};

const middlware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
