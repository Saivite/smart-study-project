export default function Button({
  children,
  className,
  variant = "purple",
  hoverable = true,
  //onClick will be passed in rest instead of passing it as onClick={onClick}
  ...rest
}) {
  const variants = {
    purple: `text-white bg-indigo-600 ${hoverable && "hover:bg-indigo-700"}`,
    red: `text-white bg-red-600 ${hoverable && "hover:bg-red-700"}`,
    lightPurple: `text-indigo-700 bg-indigo-100 ${
      hoverable && "hover:bg-indigo-200"
    }`,
    white: `text-black bg-white`,
  };

  return (
    <button
      {...rest}
      className={`disabled:opacity-50 disabled:cursor-not-allowed xs:px-8 xs:py-3 sm:p-2 border text-base rounded-md  font-medium ${className} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}
