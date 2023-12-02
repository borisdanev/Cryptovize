import CoinInfo from "./CoinInfo";
const CoinInfoList = ({ coins }) => {
  console.log(coins);
  return coins?.map((coin) => (
    <CoinInfo
      key={coin.uuid}
      name={coin.name}
      price={[
        coin?.price.split(".")[0],
        coin?.price.split(".")[1].slice(0, 2),
      ].join(".")}
      change={coin.change}
      marketCap={coin.marketCap}
      iconUrl={coin.iconUrl}
      symbol={coin.symbol}
    />
  ));
};
export default CoinInfoList;
