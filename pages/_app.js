import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import React, { useState, useEffect } from 'react';
import { Provider } from 'next-auth/client';
import Layout from '../components/Layout';
import useSWR from 'swr';
import Head from 'next/head';
import { SkeletonTheme } from 'react-loading-skeleton';
import { darkTheme, lightTheme } from '../theme';
import useDarkMode from 'use-dark-mode';
import App from 'next/app';
import cookie from 'cookie';

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100vh;
    background: ${({ navigation, theme }) =>
      navigation
        ? `linear-gradient(to bottom, ${theme.bg.sky} 0%, ${theme.bg.sky} 80%, ${theme.bg.content} 80%, ${theme.bg.content} 100%)`
        : `linear-gradient(to bottom, ${theme.bg.sky} 0%, ${theme.bg.sky} 30%, ${theme.bg.wave} 30%, ${theme.bg.wave} 100%)`};
    padding: 0;
    margin: 0;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  a {
  color: inherit;
  text-decoration: none;
}
* {
  box-sizing: border-box;
}
`;

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function MyApp({ Component, pageProps }) {
  const { data, error } = useSWR('/api/user', fetcher);
  const [navigation, setNavigation] = useState(false);
  const [isAuth] = useState(pageProps.isAuth);
  const { value, toggle } = useDarkMode(false, {});
  const theme = value ? darkTheme : lightTheme;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>Poool Party</title>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />
        <meta name="theme-color" content="#54c0f9" />
        <link rel="manifest" href="/manifest.json" />
        <link href="/favicon.png" rel="apple-touch-icon" />
        <link href="/favicon.png" rel="apple-touch-icon" sizes="152x152" />
        <link href="/favicon.png" rel="apple-touch-icon" sizes="167x167" />
        <link href="/favicon.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/favicon.png" rel="icon" sizes="192x192" />
        <link href="/favicon.png" rel="icon" sizes="128x128" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        ></meta>

        <meta name="apple-mobile-web-app-title" content="Poool Party" />

        <meta name="mobile-web-app-capable" content="yes" />

        <link
          href="/splashscreens/ipad_splash.png"
          media="(device-width: 320px)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splashscreens/ipad_splash.png"
          media="(device-width: 320px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splashscreens/ipad_splash.png"
          media="(device-width: 768px) and (orientation: portrait)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splashscreens/ipad_splash.png"
          media="(device-width: 768px) and (orientation: landscape)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splashscreens/ipad_splash.png"
          media="(device-width: 1536px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="/splashscreens/ipad_splash.png"
          media="(device-width: 1536px)  and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
      </Head>
      {mounted && (
        <>
          <GlobalStyle theme={theme} navigation={navigation} />
          <ThemeProvider theme={theme}>
            <SkeletonTheme
              color={theme.loader.color}
              highlightColor={theme.loader.highlight}
            >
              <Layout
                navigation={navigation}
                setNavigation={setNavigation}
                darkMode={value}
                setDarkMode={toggle}
                user={data}
                error={error}
                isAuth={isAuth}
                {...pageProps}
              >
                <Component user={data} {...pageProps} />
              </Layout>
            </SkeletonTheme>
          </ThemeProvider>
        </>
      )}
    </Provider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const request = appContext.ctx.req;
  if (request) {
    const cookies = cookie.parse(request.headers.cookie || '');
    appProps.pageProps = {
      isAuth: !!cookies['next-auth.session-token'],
    };
  }
  return appProps;
};
