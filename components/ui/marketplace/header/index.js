import { Breadcrumbs } from "@components/ui/common";
import { EthRates, WalletBar } from "@components/ui/web3";

export default function Header(params) {
  const LINKS = [
    {
      href: "/marketplace ",
      value: "Buy",
    },
    {
      href: "/marketplace/courses/owned",
      value: "My Courses",
    },
    {
      href: "/marketplace/courses/managed",
      value: "Manage Courses",
    },
  ];

  return (
    <>
      <div className="pb-4">
        <WalletBar />
      </div>
      <EthRates />
      <div className="flex flex-row-reverse  p-4 sm:px-6 lg:px-8">
        <Breadcrumbs className="text-sm" items={LINKS} />
      </div>
    </>
  );
}
