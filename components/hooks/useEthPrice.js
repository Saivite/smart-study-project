// // export const useEthPrice = () => {
// //   const { data, ...rest } = useSWR(
// //     //we'll use URL as state
// //     URL, //URL will be passed as paramter to second function
// //     (url) => {
// //       //to send request use fetch function
// //       fetcher(url);
// //     }
// //   );
// //   return { eth: { data, ...rest } };
// // };

import useSWR from "swr";

const URL =
  "https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false";

const COURSE_PRICE = 1500;

const fetcher = async (url) => {
  const res = await fetch(url);
  const json = await res.json();
  return json.market_data.current_price.inr ?? null;
};

export const useEthPrice = () => {
  const { data, ...rest } = useSWR(URL, fetcher, { refreshInterval: 10000 });

  let perItem = (data && COURSE_PRICE / Number(data)) ?? 0;
  perItem = perItem.toFixed(6);

  return { eth: { data, perItem, ...rest } };
};
