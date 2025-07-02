"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { truncAddress } from "@/lib/utils";
import Image from "next/image";
// import { notFound } from 'next/navigation';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useWallet } from '@solana/wallet-adapter-react';

/***
 *
 * You can spread the out into their different component
 * but every thing is here. No External component.
 *
 * BUT THERE IS A GOOD COMMENTING
 */

export default function Page({ params }) {
  const [updatesTabs, setUpdateTabs] = useState("1d");
  const [switchCurrency, setSwitchCurrency] = useState("USD");
  const currentCurrency = params?.chain;
  const [tableTableSwitch, setTableTabSwitch] = useState("1");
  const { connected, publicKey } = useWallet();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Log connection status for debugging
  useEffect(() => {
    console.log({
      connected,
      publicKey,
      isClient,
    });
  }, [connected, publicKey, isClient]);

  // Redirect to homepage if wallet is not connected
  useEffect(() => {
    if (isClient && !connected) {
      console.log("Redirecting to / because wallet is not connected");
      router.push("/");
    }
  }, [isClient, connected, router]);

  // Show loading state during SSR, connecting, or reconnecting
  if (!isClient || !connected) {
    return (
      <div className="p-4 text-white flex items-center justify-center min-h-screen">
        Loading wallet connection...
      </div>
    );
  }

  // Prevent rendering until redirect if not connected
  if (!connected) {
    return null;
  }
  return (
    <div className="p-4">
      {/* header with avatar and address */}
      <div className="flex  justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            src="/testprofile.png"
            alt="testprofile"
            width={56}
            height={56}
            className="rounded-full"
          />
          <div className="sm:space-y-2">
            <div className="flex items-center sm:gap-2">
              <div className="text-[14px] flex items-center gap-1 text-gray-300 font-semibold">
                {truncAddress("0x8b237d096a9198e3c98d77c24a64756830602e7d")}
                <button>
                  <svg
                    width="14px"
                    height="14px"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="text-gray-500"
                  >
                    <path d="M10.4034 0.890765C10.658 0.641272 11.0659 0.643285 11.318 0.895277L15.1051 4.68141C15.227 4.8033 15.2955 4.96864 15.2955 5.14105C15.2956 5.31345 15.2271 5.4788 15.1052 5.60071L5.94467 14.7603C5.82277 14.8822 5.65745 14.9506 5.48508 14.9506H1.69883C1.33984 14.9506 1.04883 14.6596 1.04883 14.3006V10.334C1.04883 10.1594 1.1191 9.99211 1.2438 9.86986L7.85521 3.38854L10.4034 0.890765ZM9.2341 3.85732L12.1221 6.74531L13.7262 5.14115L10.8539 2.26956L9.2341 3.85732ZM11.2028 7.66452L8.3057 4.7674L2.34883 10.6071V13.6506H5.21587L11.2028 7.66452ZM9.0697 14.3006C9.0697 13.9417 9.36071 13.6506 9.7197 13.6506H14.0166C14.3756 13.6506 14.6666 13.9417 14.6666 14.3006C14.6666 14.6596 14.3756 14.9506 14.0166 14.9506H9.7197C9.36071 14.9506 9.0697 14.6596 9.0697 14.3006Z"></path>
                  </svg>
                </button>
              </div>

              <button className="sm:flex items-center text-[12px] button-gradient hidden">
                <svg
                  width="16px"
                  height="16px"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <path d="M8.96954 2H10.3265L7.36191 5.38837L10.8496 9.99918H8.11876L5.9799 7.20275L3.53256 9.99918H2.17475L5.34571 6.37494L2 2H4.80012L6.73346 4.55605L8.96954 2ZM8.49328 9.18695H9.24521L4.39155 2.76956H3.58466L8.49328 9.18695Z"></path>
                </svg>
                Add Twitter
                <svg
                  width="14px"
                  height="14px"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="-rotate-90"
                >
                  <path d="M1.91523 4.25654C2.1886 3.98317 2.63181 3.98317 2.90518 4.25654L6.4102 7.76156L9.91523 4.25654C10.1886 3.98317 10.6318 3.98317 10.9052 4.25654C11.1785 4.52991 11.1785 4.97312 10.9052 5.24649L6.4102 9.74146L1.91523 5.24649C1.64186 4.97312 1.64186 4.52991 1.91523 4.25654Z"></path>
                </svg>
              </button>
            </div>

            <div className="text-text-300 text-[12px] flex items-center gap-1">
              <span className="text-white sm:block hidden">
                0x8b237d096a9198e3c98d77c24a64756830602e7d
              </span>
              <span className="text-[#8d8f8f] sm:hidden block">
                {truncAddress("0x8b237d096a9198e3c98d77c24a64756830602e7d")}
              </span>
              <svg
                width="14px"
                height="14px"
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="text-text-300 cursor-pointer group-hover:text-text-100 hover:text-text-100 transition-colors"
              >
                <path d="M10.9513 2.85078C10.9513 1.75312 10.0615 0.863281 8.96384 0.863281H3.76884C3.4996 0.863281 3.28134 1.08154 3.28134 1.35078C3.28134 1.62002 3.4996 1.83828 3.76884 1.83828H8.96384C9.52303 1.83828 9.97634 2.29159 9.97634 2.85078V8.6037C9.97634 8.87294 10.1946 9.0912 10.4638 9.0912C10.7331 9.0912 10.9513 8.87294 10.9513 8.6037V2.85078Z"></path>
                <path d="M8.71858 4.33231C8.71858 3.64886 8.16453 3.09481 7.48108 3.09481H2.28608C1.60263 3.09481 1.04858 3.64886 1.04858 4.33231V9.89992C1.04858 10.5834 1.60263 11.1374 2.28608 11.1374H7.48108C8.16453 11.1374 8.71858 10.5834 8.71858 9.89992V4.33231ZM7.48108 4.06981C7.62606 4.06981 7.74358 4.18734 7.74358 4.33231V9.89992C7.74358 10.0449 7.62606 10.1624 7.48108 10.1624H2.28608C2.14111 10.1624 2.02358 10.0449 2.02358 9.89992V4.33231C2.02358 4.18734 2.14111 4.06981 2.28608 4.06981H7.48108Z"></path>
              </svg>

              {/* share button */}
              <button className="sm:flex hidden">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <path d="M11.4308 1.37092C10.5584 1.37092 9.85123 2.07814 9.85123 2.95053C9.85123 3.28129 9.95217 3.58651 10.1249 3.83953C10.4104 4.2578 10.8889 4.53013 11.4308 4.53013C12.3032 4.53013 13.0104 3.82292 13.0104 2.95053C13.0104 2.07814 12.3032 1.37092 11.4308 1.37092ZM8.55123 2.95053C8.55123 1.36017 9.84047 0.0709229 11.4308 0.0709229C13.0212 0.0709229 14.3104 1.36017 14.3104 2.95053C14.3104 4.54089 13.0212 5.83013 11.4308 5.83013C10.6681 5.83013 9.9748 5.53324 9.46013 5.05008L6.23693 7.04849C6.34245 7.34813 6.39983 7.67026 6.39983 8.00512C6.39983 8.33738 6.34333 8.65713 6.23937 8.9548L9.46895 10.9027C9.9779 10.4476 10.6506 10.1699 11.388 10.1699C12.9784 10.1699 14.2676 11.4592 14.2676 13.0495C14.2676 14.6399 12.9784 15.9291 11.388 15.9291C9.79768 15.9291 8.50843 14.6399 8.50843 13.0495C8.50843 12.6676 8.58308 12.3024 8.71854 11.9682L5.544 10.0535C5.02439 10.5668 4.30956 10.8847 3.52023 10.8847C1.92987 10.8847 0.640625 9.59548 0.640625 8.00512C0.640625 6.41476 1.92987 5.12551 3.52023 5.12551C4.30698 5.12551 5.01973 5.44132 5.53891 5.95167L8.73672 3.96901C8.61684 3.65207 8.55123 3.30861 8.55123 2.95053ZM3.52023 6.42551C2.64784 6.42551 1.94062 7.13273 1.94062 8.00512C1.94062 8.87751 2.64784 9.58472 3.52023 9.58472C4.07844 9.58472 4.56955 9.29566 4.85141 8.85599C5.00861 8.61077 5.09983 8.31959 5.09983 8.00512C5.09983 7.69065 5.00861 7.39947 4.85141 7.15425C4.56955 6.71457 4.07844 6.42551 3.52023 6.42551ZM11.388 11.4699C10.8648 11.4699 10.4009 11.7237 10.1124 12.1176C9.92117 12.3788 9.80843 12.7001 9.80843 13.0495C9.80843 13.9219 10.5156 14.6291 11.388 14.6291C12.2604 14.6291 12.9676 13.9219 12.9676 13.0495C12.9676 12.1772 12.2604 11.4699 11.388 11.4699Z"></path>
                </svg>
              </button>
            </div>

            <button className="flex items-center !text-[10px] !m-0 !h-[20px] rounded-xl pl-3 pr-3 bg-gradient-to-r from-green-500 to-blue-500 w-fit sm:hidden">
              <svg
                width="12px"
                height="12px"
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path d="M8.96954 2H10.3265L7.36191 5.38837L10.8496 9.99918H8.11876L5.9799 7.20275L3.53256 9.99918H2.17475L5.34571 6.37494L2 2H4.80012L6.73346 4.55605L8.96954 2ZM8.49328 9.18695H9.24521L4.39155 2.76956H3.58466L8.49328 9.18695Z"></path>
              </svg>
              Add Twitter
              <svg
                width="9px"
                height="9px"
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="-rotate-90"
              >
                <path d="M1.91523 4.25654C2.1886 3.98317 2.63181 3.98317 2.90518 4.25654L6.4102 7.76156L9.91523 4.25654C10.1886 3.98317 10.6318 3.98317 10.9052 4.25654C11.1785 4.52991 11.1785 4.97312 10.9052 5.24649L6.4102 9.74146L1.91523 5.24649C1.64186 4.97312 1.64186 4.52991 1.91523 4.25654Z"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="hidden sm:block">
          <button className="flex items-center text-secondary-foreground text-[14px] gap-2 h-[40px] rounded-[35px] min-w-[104px] justify-center bg-[#1f2024]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <path d="M11.4308 1.37092C10.5584 1.37092 9.85123 2.07814 9.85123 2.95053C9.85123 3.28129 9.95217 3.58651 10.1249 3.83953C10.4104 4.2578 10.8889 4.53013 11.4308 4.53013C12.3032 4.53013 13.0104 3.82292 13.0104 2.95053C13.0104 2.07814 12.3032 1.37092 11.4308 1.37092ZM8.55123 2.95053C8.55123 1.36017 9.84047 0.0709229 11.4308 0.0709229C13.0212 0.0709229 14.3104 1.36017 14.3104 2.95053C14.3104 4.54089 13.0212 5.83013 11.4308 5.83013C10.6681 5.83013 9.9748 5.53324 9.46013 5.05008L6.23693 7.04849C6.34245 7.34813 6.39983 7.67026 6.39983 8.00512C6.39983 8.33738 6.34333 8.65713 6.23937 8.9548L9.46895 10.9027C9.9779 10.4476 10.6506 10.1699 11.388 10.1699C12.9784 10.1699 14.2676 11.4592 14.2676 13.0495C14.2676 14.6399 12.9784 15.9291 11.388 15.9291C9.79768 15.9291 8.50843 14.6399 8.50843 13.0495C8.50843 12.6676 8.58308 12.3024 8.71854 11.9682L5.544 10.0535C5.02439 10.5668 4.30956 10.8847 3.52023 10.8847C1.92987 10.8847 0.640625 9.59548 0.640625 8.00512C0.640625 6.41476 1.92987 5.12551 3.52023 5.12551C4.30698 5.12551 5.01973 5.44132 5.53891 5.95167L8.73672 3.96901C8.61684 3.65207 8.55123 3.30861 8.55123 2.95053ZM3.52023 6.42551C2.64784 6.42551 1.94062 7.13273 1.94062 8.00512C1.94062 8.87751 2.64784 9.58472 3.52023 9.58472C4.07844 9.58472 4.56955 9.29566 4.85141 8.85599C5.00861 8.61077 5.09983 8.31959 5.09983 8.00512C5.09983 7.69065 5.00861 7.39947 4.85141 7.15425C4.56955 6.71457 4.07844 6.42551 3.52023 6.42551ZM11.388 11.4699C10.8648 11.4699 10.4009 11.7237 10.1124 12.1176C9.92117 12.3788 9.80843 12.7001 9.80843 13.0495C9.80843 13.9219 10.5156 14.6291 11.388 14.6291C12.2604 14.6291 12.9676 13.9219 12.9676 13.0495C12.9676 12.1772 12.2604 11.4699 11.388 11.4699Z"></path>
            </svg>
            Share
          </button>
        </div>
      </div>
      {/* end of header */}

      {/* Refresh update and timeline dataset */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center text-[12px] gap-1">
          <button className="cursor-pointer">
            <svg
              width="12px"
              height="12px"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              fill="#C4CCCC"
              color="#C4CCCC"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.71472 3C4.94517 3 2.70001 5.24516 2.70001 8.01471C2.70001 10.7843 4.94517 13.0294 7.71472 13.0294C10.4843 13.0294 12.7294 10.7843 12.7294 8.01471C12.7294 7.60049 13.0652 7.26471 13.4794 7.26471C13.8936 7.26471 14.2294 7.60049 14.2294 8.01471C14.2294 11.6127 11.3127 14.5294 7.71472 14.5294C4.11675 14.5294 1.20001 11.6127 1.20001 8.01471C1.20001 4.41673 4.11675 1.5 7.71472 1.5C9.51241 1.5 11.1396 2.2284 12.3177 3.4046V2.25C12.3177 1.83579 12.6534 1.5 13.0677 1.5C13.4819 1.5 13.8177 1.83579 13.8177 2.25V5.54412C13.8177 5.95833 13.4819 6.29412 13.0677 6.29412H9.77354C9.35933 6.29412 9.02354 5.95833 9.02354 5.54412C9.02354 5.1299 9.35933 4.79412 9.77354 4.79412H11.5588C10.6382 3.69637 9.25751 3 7.71472 3Z"
              ></path>
            </svg>
          </button>
          Updated: 5h ago
        </div>

        <div className="flex gap-1">
          {["1d", "7d", "30d", "All"].map((v, i) => (
            <button
              onClick={() => setUpdateTabs(v)}
              key={i}
              className={`
                ${
                  v == updatesTabs
                    ? "bg-btn-secondary text-text-100"
                    : "text-white/80"
                }
              px-[8px]
              cursor-pointer
              flex
              items-center
              justify-center
              whitespace-nowrap
              text-[12px]
              font-medium
              transition-all
              duration-200
            `}
              style={{
                paddingTop: "3px",
                paddingBottom: "3px",
                borderRadius: "7px",
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      {/* end Refresh update and timeline dataset */}

      {/* grid section */}

      <div className="grid lg:grid-cols-3 grid-cols-1 mt-5 min-h-[300px] gap-2">
        {/* left side grid */}
        <div className="col-span-1 h-full bg-accent-2 rounded-md p-2 px-3">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex  items-center gap-2 text-[14px]">
                <span>{updatesTabs} Realized PnL</span>
                <button
                  className="flex items-center gap-1 text-[#C4CCCC] uppercase hover:bg-white/5 rounded-sm p-[.5px]"
                  onClick={() =>
                    setSwitchCurrency((prev) =>
                      prev == currentCurrency ? "USD" : currentCurrency
                    )
                  }
                >
                  <svg
                    width="14px"
                    height="14px"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#C4CCCC"
                    color="#C4CCCC"
                  >
                    <path d="M5.89087 1.3051C5.82675 1.0365 5.99252.766785 6.26111.702667 9.40473-.0477693 12.7963 1.30716 14.4954 4.25014 16.1945 7.19312 15.6722 10.8077 13.4505 13.155 13.3368 13.275 13.1712 13.3312 13.0081 13.3049 12.8449 13.2787 12.7052 13.1736 12.6348 13.024L11.548 10.7123C11.4305 10.4624 11.5378 10.1646 11.7877 10.0471 12.0376 9.92957 12.3355 10.0369 12.4529 10.2868L13.208 11.8928C14.7158 9.87359 14.9688 7.0701 13.6294 4.75014 12.1575 2.20075 9.21844 1.0248 6.4933 1.67534 6.22471 1.73945 5.95499 1.57369 5.89087 1.3051ZM2.99229 2.69531C3.15545 2.72148 3.29515 2.82658 3.36551 2.9761L4.45287 5.28664C4.57045 5.5365 4.46322 5.83437 4.21336 5.95195 3.96351 6.06954 3.66564 5.96231 3.54805 5.71245L2.79264 4.10724C1.28469 6.12644 1.03156 8.93007 2.37105 11.2501 3.84294 13.7995 6.78199 14.9755 9.50713 14.3249 9.77573 14.2608 10.0454 14.4266 10.1096 14.6952 10.1737 14.9638 10.0079 15.2335 9.73932 15.2976 6.59571 16.048 3.20416 14.6931 1.50503 11.7501-.194104 8.80716.328271 5.19253 2.54998 2.84529 2.66357 2.72528 2.82913 2.66914 2.99229 2.69531Z"></path>
                    <path d="M5.5 7.00002C5.5 6.17159 6.17157 5.50002 7 5.50002H7.5V5.00002C7.5 4.72387 7.72386 4.50002 8 4.50002C8.27614 4.50002 8.5 4.72387 8.5 5.00002V5.50002H10C10.2761 5.50002 10.5 5.72387 10.5 6.00002C10.5 6.27616 10.2761 6.50002 10 6.50002H7C6.72386 6.50002 6.5 6.72387 6.5 7.00002C6.5 7.27616 6.72386 7.50002 7 7.50002L9 7.50002C9.82843 7.50002 10.5 8.17159 10.5 9.00002C10.5 9.82844 9.82843 10.5 9 10.5H8.5V11C8.5 11.2762 8.27614 11.5 8 11.5C7.72386 11.5 7.5 11.2762 7.5 11V10.5H6C5.72386 10.5 5.5 10.2762 5.5 10C5.5 9.72387 5.72386 9.50002 6 9.50002H9C9.27614 9.50002 9.5 9.27616 9.5 9.00002C9.5 8.72387 9.27614 8.50002 9 8.50002L7 8.50002L6.99676 8.50001C6.16982 8.49827 5.5 7.82736 5.5 7.00002Z"></path>
                  </svg>
                  {switchCurrency}
                </button>
              </div>

              <div className="mt-4 text-[12px] text-left">
                <h2 className="text-[2rem] flex gap-1 items-baseline font-semibold text-white">
                  <span>0%</span>
                  <span className="text-[12px]">
                    0 <span className="uppercase">{switchCurrency}</span>
                  </span>
                </h2>
                <div className="text-[#c4cccc]">Total PnL</div>
                <div className="text-[#c4cccc]">
                  Unrealized Profits{" "}
                  <span className="uppercase">{switchCurrency}</span>
                </div>
              </div>
            </div>

            <div className="text-[14px] text-right">
              <div className="font-semibold">Win Rate</div>

              <div className="mt-4 text-[12px]">
                <h2 className="text-[2rem] font-semibold text-white">0%</h2>
                <div className="text-prettyRed">
                  0 <span className="uppercase">{switchCurrency}</span> (--)
                </div>
                <div className="text-prettyRed">
                  0 <span className="uppercase">{switchCurrency}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* right side grid */}
        <div className="lg:col-span-2 col-span-1 grid sm:grid-cols-2 sm:gap-0 gap-3  h-full">
          {/* there are 3 sections here */}
          <div className="h-[200px] col-span-1 bg-accent-2 sm:mr-[10px]  p-2 px-3 rounded-md">
            <div className="flex font-semibold items-center gap-2 text-[14px]">
              <span>Analysis</span>
            </div>

            <div className="text-[13px] mt-5 space-y-[1px]">
              <div className="flex justify-between">
                <div className="text-[#c4cccc]">Bal</div>
                <div className="text-white uppercase">
                  0 {switchCurrency} ($0)
                </div>
              </div>

              <div className="flex justify-between">
                <div className="text-[#c4cccc]">{updatesTabs} TXs</div>
                <div className="text-white uppercase">
                  <span className="text-[#52575a]">0</span>
                  <span className="text-[#52575a]">/</span>
                  <span className="text-[#52575a]">0</span>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="text-[#c4cccc]">{updatesTabs} Total Cost</div>
                <div className="text-white uppercase">0 {switchCurrency}</div>
              </div>

              <div className="flex justify-between">
                <div className="text-[#c4cccc]">
                  {updatesTabs} Token Avg Cost
                </div>
                <div className="text-white uppercase">0 {switchCurrency}</div>
              </div>

              <div className="flex justify-between">
                <div className="text-[#c4cccc]">
                  {updatesTabs} Token Avg Realized Profits
                </div>
                <div className="text-white uppercase">0 {switchCurrency}</div>
              </div>
            </div>
          </div>

          <div className="h-[200px] col-span-1 bg-accent-2 p-2 px-3 rounded-md">
            <div className="flex font-semibold items-center gap-2 text-[14px]">
              <span>Distribution (0)</span>
            </div>

            <div className="text-[13px] mt-5 space-y-[1px]">
              <div className="flex justify-between">
                <div className="text-[#c4cccc] flex gap-2 items-center">
                  <div className="w-3 h-3 rounded-full bg-prettyGreen"></div>
                  <div className="">{">"} 500%</div>
                </div>
                <div className="text-white uppercase">0</div>
              </div>

              <div className="flex justify-between">
                <div className="text-[#c4cccc] flex gap-2 items-center">
                  <div className="w-3 h-3 rounded-full bg-prettyGreen/60"></div>
                  <div className="">200% - 500%</div>
                </div>
                <div className="text-white uppercase">0</div>
              </div>

              <div className="flex justify-between">
                <div className="text-[#c4cccc] flex gap-2 items-center">
                  <div className="w-3 h-3 rounded-full bg-prettyGreen/40"></div>
                  <div className="">0% - 200%</div>
                </div>
                <div className="text-white uppercase">0</div>
              </div>

              <div className="flex justify-between">
                <div className="text-[#c4cccc] flex gap-2 items-center">
                  <div className="w-3 h-3 rounded-full bg-prettyRed/40"></div>
                  <div className="">0% - 50%</div>
                </div>
                <div className="text-white uppercase">0</div>
              </div>

              <div className="flex justify-between">
                <div className="text-[#c4cccc] flex gap-2 items-center">
                  <div className="w-3 h-3 rounded-full bg-prettyRed"></div>
                  <div className="">{"<-"} 50%</div>
                </div>
                <div className="text-white uppercase">0</div>
              </div>
            </div>
          </div>

          <div className="min-h-[100px] sm:col-span-2 w-full bg-accent-2  sm:mt-[10px] p-2 px-3 rounded-md">
            <div className="flex font-semibold items-center gap-2 text-[14px]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <g clipPath="url(#42clip0_9738_1914)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.29866 9.68576C6.80431 9.81526 4.35783 9.39263 2.69856 7.73336C0.378749 5.41355 0.632053 1.39908 1.12015 0.910985C1.60825 0.422885 5.62272 0.169582 7.94253 2.48939C9.60176 4.14862 10.0244 6.59503 9.89494 8.0894C10.7787 8.00941 11.9185 8.14177 12.6345 8.85771C13.089 9.31221 13.3231 9.92271 13.4152 10.5319C12.6423 10.5118 11.6192 10.9819 11.4052 11.1959C11.1912 11.4099 10.721 12.433 10.7411 13.206C10.132 13.1138 9.52149 12.8797 9.06699 12.4252C8.35107 11.7093 8.21869 10.5695 8.29866 9.68576ZM3.52857 3.31938C3.22432 3.62363 2.73103 3.62363 2.42677 3.31938C2.12252 3.01513 2.12252 2.52184 2.42677 2.21758C2.73103 1.91333 3.22432 1.91333 3.52857 2.21758C3.83282 2.52184 3.83282 3.01513 3.52857 3.31938Z"
                  ></path>
                </g>
                <defs>
                  <clipPath id="42clip0_9738_1914">
                    <rect
                      width="13.2061"
                      height="13.2061"
                      transform="translate(0.793762)"
                    ></rect>
                  </clipPath>
                </defs>
              </svg>

              <span>Phishing Check</span>
            </div>

            <div className="text-[13px] lg:w-[60%] w-full mt-2 space-y-[1px] sm:flex justify-between ">
              <div className="">
                <div className="text-[#c4cccc] flex gap-2 items-center">
                  <div className="w-3 h-3 rounded-full bg-prettyGreen"></div>
                  <div className=""> Blacklist: 0 (0%)</div>
                </div>

                <div className="text-[#c4cccc] flex gap-2 items-center">
                  <div className="w-3 h-3 rounded-full bg-prettyGreen/80"></div>
                  <div className=""> Buy/Sell within 10 secs: 0 (0%)</div>
                </div>
              </div>

              <div className="">
                <div className="text-[#c4cccc] flex gap-2 items-center">
                  <div className="w-3 h-3 rounded-full bg-prettyGreen/80"></div>
                  <div className=""> Sold{">"} Bought: 0 (0%)</div>
                </div>

                <div className="text-[#c4cccc] flex gap-2 items-center">
                  <div className="w-3 h-3 rounded-full bg-prettyGreen/80"></div>
                  <div className=""> Didn&apos;t buy: 0 (0%)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* final table */}
      <div className="mt-10">
        {/* table tab */}
        <div className="sm:flex space-x-2 justify-between items-center">
          <div className="flex gap-2 items-center py-2 whitespace-nowrap overflow-x-auto">
            <button
              onClick={() => setTableTabSwitch("1")}
              className={`text-[12px] font-[500] duration-200 ${
                tableTableSwitch == "1"
                  ? "bg-accent-buttonBg dark:text-white"
                  : "text-accent-aux-1 bg-accent-search"
              } rounded-[8px] h-[28px] px-[12px]`}
            >
              Recent PnL
            </button>
            <button
              onClick={() => setTableTabSwitch("2")}
              className={`text-[12px] font-[500] duration-200 ${
                tableTableSwitch == "2"
                  ? "bg-accent-buttonBg dark:text-white"
                  : "text-accent-aux-1 bg-accent-search"
              } rounded-[8px] h-[28px] px-[12px]`}
            >
              Holdings
            </button>
            <button
              onClick={() => setTableTabSwitch("3")}
              className={`text-[12px] font-[500] duration-200 ${
                tableTableSwitch == "3"
                  ? "bg-accent-buttonBg dark:text-white"
                  : "text-accent-aux-1 bg-accent-search"
              } rounded-[8px] h-[28px] px-[12px]`}
            >
              Activity
            </button>

            <button
              onClick={() => setTableTabSwitch("4")}
              className={`text-[12px] font-[500] duration-200 ${
                tableTableSwitch == "4"
                  ? "bg-accent-buttonBg dark:text-white"
                  : "text-accent-aux-1 bg-accent-search"
              } rounded-[8px] h-[28px] px-[12px]`}
            >
              Deployed Tokens
            </button>
          </div>

          {tableTableSwitch == "3" && (
            <button className="bg-accent-2 w-6 h-6 flex justify-center items-center rounded-md border">
              <svg
                width="12px"
                height="12px"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                fill="#C4CCCC"
                color="#C4CCCC"
              >
                <path d="M1.05151 2.01938C1.05151 1.6604 1.34253 1.36938 1.70151 1.36938H14.2997C14.6587 1.36938 14.9497 1.6604 14.9497 2.01938V3.75415C14.9497 4.17594 14.7882 4.58171 14.4983 4.88811L10.6775 8.92663V12.2919C10.6775 12.5035 10.5745 12.702 10.4013 12.8237L6.42047 15.6214C6.222 15.7609 5.96236 15.7782 5.74709 15.6664C5.53181 15.5546 5.39672 15.3322 5.39672 15.0896V8.92982L1.51256 4.89331C1.21676 4.58589 1.05151 4.17585 1.05151 3.74923V2.01938ZM2.35151 2.66938V3.74923C2.35151 3.83973 2.38656 3.92671 2.44931 3.99192L6.48715 8.18814C6.62161 8.32787 6.69672 8.51425 6.69672 8.70817V13.8383L9.37754 11.9542V8.70768C9.37754 8.51596 9.45096 8.33152 9.58273 8.19225L13.554 3.99468C13.6154 3.92969 13.6497 3.84362 13.6497 3.75415V2.66938H2.35151Z"></path>
              </svg>
            </button>
          )}

          {tableTableSwitch == "2" && (
            <div className=" flex items-center gap-[8px]">
              <div className="flex items-center md:text-[12px] text-[11px] leading-[1] gap-1">
                <Checkbox id="hide-low" className="" />
                <label className="cursor-pointer" htmlFor="hide-low">
                  Hide Low Liq/Honeypot
                </label>
              </div>

              <div className="flex items-center md:text-[12px] text-[11px] leading-[1] gap-1">
                <Checkbox id="hide-small" defaultChecked={true} />
                <label className="cursor-pointer" htmlFor="hide-small">
                  Hide Small Asset
                </label>
              </div>

              <div className="flex items-center md:text-[12px] text-[11px] leading-[1] gap-1">
                <Checkbox id="hide-sell" defaultChecked={true} />
                <label className="cursor-pointer" htmlFor="hide-sell">
                  Hide Sell Out
                </label>
              </div>
            </div>
          )}
        </div>

        {/* show this on tab 4 */}
        {tableTableSwitch == "4" && (
          <div className="text-[13px] flex gap-2 items-center my-2 mt-3">
            <div className="">Total pairs(0)</div>
            <div className="">
              <span className="text-[#8d8f8f]">Migrated</span>{" "}
              <span className="text-prettyGreen">(0)</span>
            </div>
            <div className="">
              <span className="text-[#8d8f8f]">Non Migrated</span>
              <span className="text-prettyRed">(0)</span>
            </div>
          </div>
        )}

        {/* main table */}
        <div className="w-full mt-5 h-[781px] border gap-5 overflow-y-auto relative">
          <div className="relative overflow-auto h-full w-full">
            <div className="overflow-x-auto">
              <table className="bg-accent-2 w-[1466px] min-w-full">
                {/* CHECK BELOW TO SEE TABLE COMPONENT FOR DIFFERENT TABS */}
                {tableTableSwitch == "1" ? (
                  <Table1 />
                ) : tableTableSwitch == "2" ? (
                  <Table2 />
                ) : tableTableSwitch == "3" ? (
                  <Table3 />
                ) : (
                  <Table4 />
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Table1() {
  return (
    <>
      <colgroup>
        <col style={{ width: "100px" }} />
        <col />
        <col />
        <col />
        <col />
        <col />
        <col />
        <col />
        <col />
      </colgroup>
      <thead className="whitespace-nowrap border-b-2">
        <tr className="text-[#c2cccc] font-[300] bg-accent-2 text-[12px] z-[10] sticky top-0">
          <th className="font-[400] py-3 px-2 sticky top-0 left-0 z-10 bg-accent-2">
            <div className="flex items-center gap-1">
              <button className="flex items-center gap-1">Token</button>
              <span>/</span>
              <button className="flex items-center gap-1">
                <span>Last Active</span>
                <span aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.199 2.344a.4.4 0 01.602 0L6.42 5.337A.4.4 0 016.118 6H.882a.4.4 0 01-.302-.663L3.2 2.344z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path>
                  </svg>
                </span>
              </button>
            </div>
          </th>

          <th className="font-[400] py-3 px-2">
            <div className="flex items-center gap-1">
              <button className="flex items-center gap-1">
                Unrealized
                <span aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.199 2.344a.4.4 0 01.602 0L6.42 5.337A.4.4 0 016.118 6H.882a.4.4 0 01-.302-.663L3.2 2.344z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path>
                  </svg>
                </span>
              </button>
            </div>
          </th>

          <th className="font-[400] py-3 px-2">
            <div className="flex items-center gap-1">
              <button className="flex items-center gap-1">
                Realized Profit
                <span aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.199 2.344a.4.4 0 01.602 0L6.42 5.337A.4.4 0 016.118 6H.882a.4.4 0 01-.302-.663L3.2 2.344z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path>
                  </svg>
                </span>
              </button>
            </div>
          </th>

          <th className="font-[400] py-3 px-2">
            <div className="flex items-center gap-1">
              <button className="flex items-center gap-1">
                Total Profit
                <span aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.199 2.344a.4.4 0 01.602 0L6.42 5.337A.4.4 0 016.118 6H.882a.4.4 0 01-.302-.663L3.2 2.344z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path>
                  </svg>
                </span>
              </button>
            </div>
          </th>

          <th className="font-[400] py-3 px-2">
            <div className="flex items-center gap-1">
              <button className="flex items-center gap-1">
                Balance
                <span aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.199 2.344a.4.4 0 01.602 0L6.42 5.337A.4.4 0 016.118 6H.882a.4.4 0 01-.302-.663L3.2 2.344z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path>
                  </svg>
                </span>
              </button>
              <div className="space-x-1 flex items-center text-[12px]">
                <span>USD</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12px"
                  height="12px"
                  fill="#5C6068"
                  viewBox="0 0 16 16"
                >
                  <g clipPath="url(#clip0_7009_491)">
                    <path d="M5.89 1.305a.5.5 0 01.371-.602 7.503 7.503 0 017.19 12.452.5.5 0 01-.816-.131l-1.087-2.312a.5.5 0 01.905-.425l.755 1.606A6.502 6.502 0 006.493 1.675a.5.5 0 01-.602-.37z"></path>
                    <path d="M2.992 2.695a.5.5 0 01.374.281l1.087 2.31a.5.5 0 01-.905.426l-.755-1.605a6.502 6.502 0 006.714 10.218.5.5 0 01.232.973A7.503 7.503 0 012.55 2.845a.5.5 0 01.442-.15z"></path>
                    <path d="M5.5 7A1.5 1.5 0 017 5.5h.5V5a.5.5 0 111 0v.5H10a.5.5 0 010 1H7a.5.5 0 100 1h2a1.5 1.5 0 110 3h-.5v.5a.5.5 0 01-1 0v-.5H6a.5.5 0 010-1h3a.5.5 0 000-1H6.997A1.5 1.5 0 015.5 7z"></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_7009_491">
                      <rect width="16" height="16"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </th>

          <th className="font-[400] py-3 px-2">
            <div className="flex items-center gap-1">Position %</div>
          </th>

          <th className="font-[400] py-3 px-2 sticky top-0 left-0 z-10 bg-accent-2">
            <div className="flex items-center gap-1">
              <button className="flex items-center gap-1">
                Bought
                <span aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.199 2.344a.4.4 0 01.602 0L6.42 5.337A.4.4 0 016.118 6H.882a.4.4 0 01-.302-.663L3.2 2.344z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path>
                  </svg>
                </span>
              </button>
              <span>/</span>
              <button className="flex items-center gap-1">
                <span>Avg</span>
              </button>
            </div>
          </th>

          <th className="font-[400] py-3 px-2 sticky top-0 left-0 z-10 bg-accent-2">
            <div className="flex items-center gap-1">
              <button className="flex items-center gap-1">
                Sold
                <span aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.199 2.344a.4.4 0 01.602 0L6.42 5.337A.4.4 0 016.118 6H.882a.4.4 0 01-.302-.663L3.2 2.344z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path>
                  </svg>
                </span>
              </button>
              <span>/</span>
              <button className="flex items-center gap-1">
                <span>Avg</span>
              </button>
            </div>
          </th>
          <th className="font-[400] py-3 px-2">
            <div className="flex items-center gap-1">30D TXs</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={9}>
            <div className="w-full h-[250px] bg-accent-2 flex items-center justify-center">
              <div className="flex flex-col items-center gap-1">
                <Image src={"/nodata.svg"} width={70} height={70} alt="no data" />
                <p className="text-accent-aux-1 text-[14px]">
                  No buying or selling in the last 30 days.
                </p>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
}

function Table2() {
  return (
    <>
      <colgroup>
        <col style={{ width: "100px" }} />
        <col />
        <col />
        <col />
        <col />
        <col />
        <col />
        <col />
      </colgroup>
      <thead className="whitespace-nowrap border-b-2">
        <tr className="text-[#c2cccc] font-[300] bg-accent-2 text-[12px] z-[10] sticky top-0">
          <th className="font-[400] py-3 px-2 sticky top-0 left-0 z-10 bg-accent-2">
            <div className="flex items-center gap-1">
              <button className="flex items-center gap-1">Token</button>
              <span>/</span>
              <button className="flex items-center gap-1">
                <span>Last Active</span>
                <span aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.199 2.344a.4.4 0 01.602 0L6.42 5.337A.4.4 0 016.118 6H.882a.4.4 0 01-.302-.663L3.2 2.344z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path>
                  </svg>
                </span>
              </button>
            </div>
          </th>

          <th className="font-[400] py-3 px-2">
            <div className="flex items-center gap-1">
              <button className="flex items-center gap-1">
                Unrealized
                <span aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.199 2.344a.4.4 0 01.602 0L6.42 5.337A.4.4 0 016.118 6H.882a.4.4 0 01-.302-.663L3.2 2.344z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path>
                  </svg>
                </span>
              </button>
            </div>
          </th>

          <th className="font-[400] py-3 px-2">
            <div className="flex items-center gap-1">
              <button className="flex items-center gap-1">
                Total Profit
                <span aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.199 2.344a.4.4 0 01.602 0L6.42 5.337A.4.4 0 016.118 6H.882a.4.4 0 01-.302-.663L3.2 2.344z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path>
                  </svg>
                </span>
              </button>
            </div>
          </th>

          <th className="font-[400] py-3 px-2">
            <div className="flex items-center gap-1">
              <button className="flex items-center gap-1">
                Balance
                <span aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.199 2.344a.4.4 0 01.602 0L6.42 5.337A.4.4 0 016.118 6H.882a.4.4 0 01-.302-.663L3.2 2.344z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path>
                  </svg>
                </span>
              </button>
              <div className="space-x-1 flex items-center text-[12px]">
                <span>USD</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12px"
                  height="12px"
                  fill="#5C6068"
                  viewBox="0 0 16 16"
                >
                  <g clipPath="url(#clip0_7009_491)">
                    <path d="M5.89 1.305a.5.5 0 01.371-.602 7.503 7.503 0 017.19 12.452.5.5 0 01-.816-.131l-1.087-2.312a.5.5 0 01.905-.425l.755 1.606A6.502 6.502 0 006.493 1.675a.5.5 0 01-.602-.37z"></path>
                    <path d="M2.992 2.695a.5.5 0 01.374.281l1.087 2.31a.5.5 0 01-.905.426l-.755-1.605a6.502 6.502 0 006.714 10.218.5.5 0 01.232.973A7.503 7.503 0 012.55 2.845a.5.5 0 01.442-.15z"></path>
                    <path d="M5.5 7A1.5 1.5 0 017 5.5h.5V5a.5.5 0 111 0v.5H10a.5.5 0 010 1H7a.5.5 0 100 1h2a1.5 1.5 0 110 3h-.5v.5a.5.5 0 01-1 0v-.5H6a.5.5 0 010-1h3a.5.5 0 000-1H6.997A1.5 1.5 0 015.5 7z"></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_7009_491">
                      <rect width="16" height="16"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </th>

          <th className="font-[400] py-3 px-2">
            <div className="flex items-center gap-1">Position %</div>
          </th>

          <th className="font-[400] py-3 px-2 sticky top-0 left-0 z-10 bg-accent-2">
            <div className="flex items-center gap-1">
              <button className="flex items-center gap-1">
                Bought
                <span aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.199 2.344a.4.4 0 01.602 0L6.42 5.337A.4.4 0 016.118 6H.882a.4.4 0 01-.302-.663L3.2 2.344z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path>
                  </svg>
                </span>
              </button>
              <span>/</span>
              <button className="flex items-center gap-1">
                <span>Avg</span>
              </button>
            </div>
          </th>

          <th className="font-[400] py-3 px-2 sticky top-0 left-0 z-10 bg-accent-2">
            <div className="flex items-center gap-1">
              <button className="flex items-center gap-1">
                Sold
                <span aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.199 2.344a.4.4 0 01.602 0L6.42 5.337A.4.4 0 016.118 6H.882a.4.4 0 01-.302-.663L3.2 2.344z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path>
                  </svg>
                </span>
              </button>
              <span>/</span>
              <button className="flex items-center gap-1">
                <span>Avg</span>
              </button>
            </div>
          </th>

          <th className="font-[400] py-3 px-2">
            <div className="flex items-center gap-1">30D TXs</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={8}>
            <div className="w-full h-[250px] bg-accent-2 flex items-center justify-center">
              <div className="flex flex-col items-center gap-1">
                <Image src={"/nodata.svg"} width={70} height={70} alt="no data" />
                <p className="text-accent-aux-1 text-[14px]">No assets held.</p>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
}

function Table3() {
  return (
    <>
      <colgroup>
        <col style={{ width: "100px" }} />
        <col />
        <col />
        <col />
        <col />
        <col />
        <col />
      </colgroup>
      <thead className="whitespace-nowrap border-b-2">
        <tr className="text-[#c2cccc] font-[300] bg-accent-2 text-[12px] z-[10] sticky top-0">
          <th className="font-[400] py-3 px-2 sticky top-0 left-0 z-10 bg-accent-2">
            <div className="flex items-center gap-1">
              <button className="flex items-center gap-1">Type</button>
            </div>
          </th>

          <th className="font-[400] py-3 px-2">
            <div className="flex items-center gap-1">
              <button className="flex items-center gap-1">
                Token
                <span aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.199 2.344a.4.4 0 01.602 0L6.42 5.337A.4.4 0 016.118 6H.882a.4.4 0 01-.302-.663L3.2 2.344z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path>
                  </svg>
                </span>
              </button>
            </div>
          </th>

          <th className="font-[400] py-3 px-2">
            <div className="flex items-center gap-1">
              <button className="flex items-center gap-1">
                Total
                <span aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.199 2.344a.4.4 0 01.602 0L6.42 5.337A.4.4 0 016.118 6H.882a.4.4 0 01-.302-.663L3.2 2.344z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="8"
                    fill="currentColor"
                    viewBox="0 0 7 7"
                  >
                    <path d="M3.801 4.656a.4.4 0 01-.602 0L.58 1.663A.4.4 0 01.882 1h5.236a.4.4 0 01.302.663L3.8 4.656z"></path>
                  </svg>
                </span>
              </button>
              <div className="space-x-1 flex items-center text-[12px]">
                <span>USD</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12px"
                  height="12px"
                  fill="#5C6068"
                  viewBox="0 0 16 16"
                >
                  <g clipPath="url(#clip0_7009_491)">
                    <path d="M5.89 1.305a.5.5 0 01.371-.602 7.503 7.503 0 017.19 12.452.5.5 0 01-.816-.131l-1.087-2.312a.5.5 0 01.905-.425l.755 1.606A6.502 6.502 0 006.493 1.675a.5.5 0 01-.602-.37z"></path>
                    <path d="M2.992 2.695a.5.5 0 01.374.281l1.087 2.31a.5.5 0 01-.905.426l-.755-1.605a6.502 6.502 0 006.714 10.218.5.5 0 01.232.973A7.503 7.503 0 012.55 2.845a.5.5 0 01.442-.15z"></path>
                    <path d="M5.5 7A1.5 1.5 0 017 5.5h.5V5a.5.5 0 111 0v.5H10a.5.5 0 010 1H7a.5.5 0 100 1h2a1.5 1.5 0 110 3h-.5v.5a.5.5 0 01-1 0v-.5H6a.5.5 0 010-1h3a.5.5 0 000-1H6.997A1.5 1.5 0 015.5 7z"></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_7009_491">
                      <rect width="16" height="16"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </th>

          <th className="font-[400] py-3 px-2">
            <div className="flex items-center gap-1">Amount</div>
          </th>

          <th className="font-[400] py-3 px-2 sticky top-0 left-0 z-10 bg-accent-2">
            <div className="flex items-center gap-1">Price</div>
          </th>

          <th className="font-[400] py-3 px-2 sticky top-0 left-0 z-10 bg-accent-2">
            <div className="flex items-center gap-1">Profit</div>
          </th>

          <th className="font-[400] py-3 px-2 sticky top-0 left-0 z-10 bg-accent-2">
            <div className="flex items-center gap-1">Age</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={7}>
            <div className="w-full h-[250px] bg-accent-2 flex items-center justify-center">
              <div className="flex flex-col items-center gap-1">
                <Image src={"/nodata.svg"} width={70} height={70} alt="no data" />
                <p className="text-accent-aux-1 text-[14px]">No Data</p>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
}

function Table4() {
  return (
    <>
      <colgroup>
        <col style={{ width: "100px" }} />
        <col />
        <col />
        <col />
        <col />
        <col />
        <col />
      </colgroup>
      <thead className="whitespace-nowrap border-b-2">
        <tr className="text-[#c2cccc] font-[300] bg-accent-2 text-[12px] z-[10] sticky top-0">
          <th className="font-[400] py-3 px-2 sticky top-0 left-0 z-10 bg-accent-2">
            <div className="flex items-center gap-1">
              <button className="flex items-center gap-1">Token</button>
            </div>
          </th>

          <th className="font-[400] py-3 px-2">
            <div className="flex items-center gap-1">
              <button className="flex items-center gap-1">Age</button>
            </div>
          </th>

          <th className="font-[400] py-3 px-2">
            <div className="flex items-center gap-1">
              <button className="flex items-center gap-1">Migrated</button>
            </div>
          </th>

          <th className="font-[400] py-3 px-2">
            <div className="flex items-center gap-1">MC</div>
          </th>

          <th className="font-[400] py-3 px-2 sticky top-0 left-0 z-10 bg-accent-2">
            <div className="flex items-center gap-1">Liq</div>
          </th>

          <th className="font-[400] py-3 px-2 sticky top-0 left-0 z-10 bg-accent-2">
            <div className="flex items-center gap-1">Holders</div>
          </th>

          <th className="font-[400] py-3 px-2 sticky top-0 left-0 z-10 bg-accent-2">
            <div className="flex items-center gap-1">1h Vol</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={7}>
            <div className="w-full h-[250px] bg-accent-2 flex items-center justify-center">
              <div className="flex flex-col items-center gap-1">
                <Image src={"/nodata.svg"} width={70} height={70} alt="no data" />
                <p className="text-accent-aux-1 text-[14px]">No Data</p>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
}