import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../config/theme";
import createEmotionCache from "../config/createEmotionCache";
import { ApolloProvider } from "@apollo/client";
import { useRouter } from "next/router";
import client from "../services/apollo-client";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Box } from "@mui/material";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const sections = [
  { title: "Technology", url: "#" },
  { title: "Design", url: "#" },
  { title: "Culture", url: "#" },
  { title: "Business", url: "#" },
  { title: "Politics", url: "#" },
  { title: "Opinion", url: "#" },
  { title: "Science", url: "#" },
  { title: "Health", url: "#" },
  { title: "Style", url: "#" },
  { title: "Travel", url: "#" },
];

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();
  return (
    <ApolloProvider client={client}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              minHeight: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CssBaseline />
            {!["/login", "/signup"].includes(router.pathname) && (
              <Header sections={sections} title="SPM" />
            )}
            <Component {...pageProps} />
            {/* <Footer /> */}
          </Box>
        </ThemeProvider>
      </CacheProvider>
    </ApolloProvider>
  );
}
