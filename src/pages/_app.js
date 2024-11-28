import "@/styles/globals.css";
import Layout from "../components/layout";
import { AuthProvider } from "@/context/authcontext";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const Theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1a1a1b",
      paper: "#282828",
    },
    primary: {
      main: "#FF4500",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#D7DADC",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    fontSize: 14,
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  );
}
