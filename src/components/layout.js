import Header from "./header";
import Main from "./main";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <>
      <Header></Header>
      <Main>{children}</Main>
      <Footer></Footer>
    </>
  )
}
