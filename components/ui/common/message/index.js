import { useState } from "react";

const TYPES = {
  warn: "yellow",
  success: "green",
  danger: "red",
};

export default function Message({ children, type }) {
  const [isDisplayed, setIsDisplayed] = useState(true);
  if (!isDisplayed) {
    return null;
  }

  const messageType = TYPES[type];

  return (
    <div
      className={`bg-${messageType != null && messageType}-100 rounded-xl mb-3`}
    >
      <div className="max-w-7xl mx-auto py-2 px-1">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <div
              className={`ml-3 font-sm text-${
                messageType != null && messageType
              }-900 `}
            >
              <span className={`inline`}>{children}</span>
            </div>
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              onClick={() => setIsDisplayed(false)}
              type="button"
              className="-mr-1 flex p-2 rounded-md  focus:outline-none focus:ring-2  sm:-mr-2"
            >
              <span className="sr-only">Dismiss</span>
              <svg
                className={`text-${
                  messageType != null && messageType
                }-800 h-6 w-6 text-white-800`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
