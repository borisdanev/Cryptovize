import { createSlice, current } from "@reduxjs/toolkit";
const initialState = {
  firstName: "Guest",
  lastName: "",
  email: "",
  password: "",
  imageUrl: "",
  active: false,
  wallet: {
    cash: 1000000,
    coins: [],
    transactions: [],
    receiver: null,
  },
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      const user = action.payload;
      return user;
    },
    setActiveUser(state) {
      return { ...state, active: true };
    },
    buyCrypto(state, action) {
      const { coin, value, date } = action.payload;
      if (state.wallet.cash < value)
        state.error = "Insufficient funds to buy this coin";
      else {
        const existingCoin = state.wallet.coins.find(
          (c) => coin.name === c.name
        );
        const quantity = +coin.quantity;
        if (existingCoin) {
          existingCoin.quantity = +existingCoin.quantity + quantity;
        } else state.wallet.coins.push(coin);
        state.wallet.cash -= value;
        state.wallet.transactions.unshift({
          action: "buy",
          coin,
          date,
          type: 0,
          value,
        });
      }
    },
    sellCrypto(state, action) {
      const { coin, value, date } = action.payload;
      const currentCoin = state.wallet.coins.find(
        (item) => item.id === coin.id
      );
      const currentCoinQuantity = parseFloat(
        Number(currentCoin?.quantity).toFixed(4)
      );
      const coinQuantity = +coin.quantity;
      if (coinQuantity <= currentCoinQuantity) {
        currentCoin.quantity = currentCoinQuantity - coinQuantity;
        if (currentCoin.quantity <= 0) {
          const index = state.wallet.coins.findIndex(
            (coin) => coin.id === currentCoin.id
          );
          state.wallet.coins.splice(index, 1);
        }
        state.wallet.cash = Number(state.wallet.cash) + Number(value);
        state.wallet.transactions.unshift({
          action: "sell",
          coin,
          date,
          type: 1,
          value,
        });
      } else state.error = "Not enough of this coin!";
    },
    swapCrypto(state, action) {
      const { coin, value, date, tradingCoin } = action.payload;
      const existingCoin = state.wallet.coins.find(
        (item) => item.id === coin.id
      );
      const existingTradingCoin = state.wallet.coins.find(
        (item) => item.id === tradingCoin.id
      );
      if (existingCoin?.quantity >= coin.quantity) {
        existingCoin.quantity =
          Number(existingCoin.quantity) - Number(coin.quantity);
        if (existingCoin.quantity <= 0) {
          const index = state.wallet.coins.findIndex(
            (coin) => coin.id === existingCoin.id
          );
          state.wallet.coins.splice(index, 1);
        }
        if (existingTradingCoin)
          existingTradingCoin.quantity =
            Number(value) + Number(existingTradingCoin.quantity);
        else state.wallet.coins.push(tradingCoin);
        state.wallet.transactions.unshift({
          action: "swap",
          coin,
          tradingCoin,
          date,
          type: 2,
          value,
        });
      } else state.error = "Not enough of this coin!";
    },
    sendCrypto(state, action) {
      const { receiver, value, coin, date } = action.payload;
      const existingCoin = state.wallet.coins.find(
        (item) => item.id === coin.id
      );
      if (
        receiver &&
        coin.quantity <= existingCoin?.quantity &&
        coin.quantity > 0
      ) {
        const receiverCoin = receiver.wallet.coins.find(
          (item) => item.symbol === coin.symbol
        );
        state.wallet.receiver = receiver;
        existingCoin.quantity =
          Number(existingCoin.quantity) - Number(coin.quantity);
        if (existingCoin.quantity <= 0) {
          const index = state.wallet.coins.findIndex(
            (coin) => coin.id === existingCoin.id
          );
          state.wallet.coins.splice(index, 1);
        }
        if (receiverCoin) {
          receiverCoin.quantity =
            Number(receiverCoin.quantity) + Number(coin.quantity);
        } else receiver.wallet.coins.push(coin);
        state.wallet.transactions.unshift({
          action: "send",
          coin,
          date,
          type: 1,
          value,
        });
        receiver.wallet.transactions.unshift({
          action: "receive",
          coin,
          date,
          type: 0,
          value,
        });
      } else {
        if (!receiver) state.error = "Invalied receiver address";
        if (coin.quantity <= existingCoin?.quantity)
          state.error = "Not enough of this coin";
      }
    },
    clearError(state) {
      state.error = null;
    },
    logOutUser(state) {
      return initialState;
    },
  },
});
export const {
  setCurrentUser,
  setActiveUser,
  buyCrypto,
  sellCrypto,
  swapCrypto,
  sendCrypto,
  clearError,
  logOutUser,
} = userSlice.actions;
export default userSlice.reducer;
