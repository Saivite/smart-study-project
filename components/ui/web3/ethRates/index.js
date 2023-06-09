import { useEthPrice, COURSE_PRICE } from "@components/hooks/useEthPrice";
import { Loader } from "@components/ui/common";
import Image from "next/image";

export default function EthRates() {
  const { eth } = useEthPrice();

  return (
    <div className="flex flex-col md:flex-row text-center">
      <div className="p-10 border drop-shadow rounded-md">
        <div className="flex items-center justify-center">
          {!eth.data ? (
            <div className="w-full flex justify-center ">
              <Loader size="md" />
            </div>
          ) : (
            <>
              <Image
                layout="fixed"
                height="35"
                width="35"
                src="/small-eth.webp"
              />
              <span className="text-xl font-bold">ETH= ₹{eth.data}</span>
            </>
          )}
        </div>
        <p className="text-md text-gray-500">Current eth Price</p>
      </div>

      <div className="p-10 border drop-shadow rounded-md">
        <div className="flex items-center justify-center">
          {eth.data ? (
            <>
              <span className="text-xl font-bold">{eth.perItem}</span>
              <Image
                layout="fixed"
                height="35"
                width="35"
                src="/small-eth.webp"
              />
              <span className="text-xl font-bold">= ₹{COURSE_PRICE}</span>
            </>
          ) : (
            <div className="w-full flex justify-center ">
              <Loader size="md" />
            </div>
          )}
        </div>
        <p className="text-md text-gray-500">Price per course</p>
      </div>
    </div>
  );
}
