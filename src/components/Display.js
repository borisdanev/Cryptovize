import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../store";
import useCheckActivity from "../hooks/useCheckActivity";
import MarketDataDisplay from "./MarketDataDisplay";
import OverviewDisplay from "./OverviewDisplay";
import BuyDisplay from "./BuyDisplay";
import SellDisplay from "./SellDisplay";
import SwapDisplay from "./SwapDisplay";
import WalletDisplay from "./WalletDisplay";
import SendDisplay from "./SendDisplay";
import UnregisteredDisplay from "./UnregisteredDisplay";
const Display = () => {
  const dispatch = useDispatch();
  const action = useSelector((state) => state.display);
  const active = useCheckActivity();
  useEffect(() => {
    dispatch(clearError());
  }, [action]);
  if (action === "Market Data") return <MarketDataDisplay />;
  if (action === "Overview") return <OverviewDisplay />;
  if (active) {
    if (action === "Buy Crypto") return <BuyDisplay />;
    if (action === "Sell Crypto") return <SellDisplay />;
    if (action === "Swap") return <SwapDisplay />;
    if (action === "Wallet") return <WalletDisplay />;
    if (action === "Send") return <SendDisplay />;
  } else {
    return <UnregisteredDisplay />;
  }
};
export default Display;
