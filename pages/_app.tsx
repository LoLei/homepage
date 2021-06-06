import '../styles/all.scss';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container">
      <div className="header">
        <Header />
      </div>
      <div className="main">
        <Component {...pageProps} />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
export default MyApp;
