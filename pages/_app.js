import "@styles/globals.css";

const Noop = ({ children }) => <>{children}</>;

export default function App({ Component, pageProps }) {
  //If 1st value is undefined/ null then use Noop(No operations)
  const Layout = Component.Layout ?? Noop;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
