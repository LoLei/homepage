import "../styles/all.scss";
import type { AppProps } from "next/app";
import Header from "../components/header";
import Footer from "../components/footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container">
      <div className="header">
        <Header></Header>
      </div>
      <div className="main">
        <Component {...pageProps} />
      </div>
      <div className="footer">
        <Footer>Footer</Footer>
      </div>
    </div>
  );
}
export default MyApp;
