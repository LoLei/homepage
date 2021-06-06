import "../styles/all.scss";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container">
      <div className="header">
        <header>Header</header>
      </div>
      <div className="main">
        <Component {...pageProps} />
      </div>
      <div className="footer">
        <footer>Footer</footer>
      </div>
    </div>
  );
}
export default MyApp;
