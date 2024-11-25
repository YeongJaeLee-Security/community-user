import "@/styles/globals.css";
import Layout from "../components/layout"
import { AuthProvider } from "@/context/authcontext";
// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }
//

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
    <Layout>
      <Component {...pageProps}></Component>
    </Layout>
    </AuthProvider>
  );
}

// export default function App({ Component, pageProps }) {
//   const getLayout = Component.getLayout ?? ((page) => page);

//   return getLayout(<Component {...pageProps}></Component>);
// }
