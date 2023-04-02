export default function Button({
  children,
  className = "text-white bg-indigo-600 hover:bg-indigo-700",
  //onClick will be passed in rest instead of passing it as onClick={onClick}
  ...rest
}) {
  return (
    <button
      {...rest}
      className={`disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 border text-base rounded-md  font-medium ${className}`}
    >
      {children}
    </button>
  );
}
