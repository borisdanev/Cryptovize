import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useGetCoinsQuery, coinApi } from "./apis/cryptoApi";
import displayReducer, { selectDisplay } from "./slices/displaySlice";
import coinsReducer, { selectCoin } from "./slices/coinsSlice";
import { createUser, getUsers, getUser, updateUser } from "./apis/usersApi";
import userReducer, {
  setCurrentUser,
  setActiveUser,
  buyCrypto,
  sellCrypto,
  swapCrypto,
  sendCrypto,
  clearError,
  logOutUser,
} from "./slices/userSlice";
const rootReducer = combineReducers({
  [coinApi.reducerPath]: coinApi.reducer,
  display: displayReducer,
  coins: coinsReducer,
  user: userReducer,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coinApi.middleware),
});
export {
  store,
  useGetCoinsQuery,
  selectDisplay,
  selectCoin,
  createUser,
  getUsers,
  getUser,
  updateUser,
  setCurrentUser,
  setActiveUser,
  buyCrypto,
  sellCrypto,
  swapCrypto,
  sendCrypto,
  clearError,
  logOutUser,
};
