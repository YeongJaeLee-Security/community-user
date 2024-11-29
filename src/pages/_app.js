import "@/styles/globals.css";
import Layout from "../components/layout";
import { AuthProvider } from "@/context/authcontext";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useState } from "react";

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
  const [searchQuery, setSearchQuery] = useState(''); 

  return (
    <AuthProvider>
    <ThemeProvider theme={Theme}>
      <CssBaseline />
        <Layout searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
          <Component {...pageProps} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </Layout>
    </ThemeProvider>
    </AuthProvider>
  );
}
