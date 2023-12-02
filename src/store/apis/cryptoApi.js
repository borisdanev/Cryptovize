import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const coinApi = createApi({
  reducerPath: "coinApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://coinranking1.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "6262113d64msh24679dc84695e10p179da1jsn22caf3f8f106"
      );
      headers.set("X-RapidAPI-Host", "coinranking1.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCoins: builder.query({
      query: (params) =>
        `/coins?referenceCurrencyUuid=${params.referenceCurrencyUuid}&timePeriod=24h&tiers%5B0%5D=1&orderBy=${params.orderBy}&orderDirection=${params.orderDirection}&limit=10&offset=0`,
    }),
    getCoinPrice: builder.query({
      query: (params) =>
        `/coin/${params.id}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${params.period}`,
    }),
  }),
});
export const { useGetCoinsQuery, useGetCoinPriceQuery } = coinApi;
export { coinApi };
