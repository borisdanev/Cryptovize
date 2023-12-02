import CoinInfo from "./CoinInfo";
const CoinInfoList = ({ coins }) => {
  return coins?.map((item) => (
    <CoinInfo
      key={item.uuid}
      name={item.name}
      price={[
        item?.price.split(".")[0],
        item?.price.split(".")[1].slice(0, 2),
      ].join(".")}
      change={item.change}
      marketCap={item.marketCap}
      iconUrl={item.iconUrl}
    />
  ));
};
export default CoinInfoList;
