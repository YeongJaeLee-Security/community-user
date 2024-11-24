import "@/styles/globals.css";
import Layout from "../components/layout"

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }
//

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps}></Component>
    </Layout>
  );
}

// export default function App({ Component, pageProps }) {
//   const getLayout = Component.getLayout ?? ((page) => page);

//   return getLayout(<Component {...pageProps}></Component>);
// }
