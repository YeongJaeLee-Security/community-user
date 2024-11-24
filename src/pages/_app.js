import "@/styles/globals.css";
import Layout from "../components/layout"
import { AuthProvider } from "@/context/AuthContext";
// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }
//

export default function App({ Component, pageProps }) {
  return (
    <Layout>
    <AuthProvider>
      <Component {...pageProps}></Component>
    </AuthProvider>
    </Layout>
  );
}

// export default function App({ Component, pageProps }) {
//   const getLayout = Component.getLayout ?? ((page) => page);

//   return getLayout(<Component {...pageProps}></Component>);
// }
