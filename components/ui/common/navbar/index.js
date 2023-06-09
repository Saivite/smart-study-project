import { useWeb3 } from "@components/providers";
import Link from "next/link";
import { ActiveLink, Button } from "@components/ui/common";
import { useAccount } from "@components/hooks/web3/";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Navbar() {
  const { connect, isLoading, requireInstall } = useWeb3();
  const { account } = useAccount();
  //this will return a function
  // const _useAccount = useAccount(web3);
  // const { account } = _useAccount();
  const { pathname } = useRouter();

  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex flex-col xs:flex-row justify-between items-center">
            <div>
              <ActiveLink
                href="/"
                className=" text-xl font-bold mr-8 text-gray-500 hover:text-gray-900"
              >
                <Image
                  src="/ss-seeklogo.com.png"
                  height="50"
                  width="50"
                  layout="fit"
                />
                SmartStudy
              </ActiveLink>
              <ActiveLink
                href="/marketplace "
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Marketplace
              </ActiveLink>
            </div>
            <div className="text-center">
              {isLoading ? (
                <Button disabled={true} onClick={connect}>
                  Loading...
                </Button>
              ) : account.data ? (
                <Button
                  hoverable={false}
                  className="cursor-default hover:opacity-100"
                >
                  Hi There {account.isAdmin && "Admin"}
                </Button>
              ) : requireInstall ? (
                <Button
                  onClick={() =>
                    window.open("https://metamask.io/download/", "_blank")
                  }
                >
                  Install Metamask
                </Button>
              ) : (
                <Button onClick={connect}>Connect</Button>
              )}
            </div>
          </div>
        </nav>
      </div>
      {account.data && !pathname.includes("/marketplace") && (
        <div className="flex justify-end pt-2=1 sm:px-6 lg:px-8">
          <div className="text-white bg-indigo-600 rounded-md p-2">
            {console.log(account.dat)}
            {account.data}
          </div>
        </div>
      )}
    </section>
  );
}
