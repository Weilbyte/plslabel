import { createGlobalStyle } from 'styled-components'
import { ThemeProvider, themeGet } from '@primer/components'

import UserProvider, { useUser } from '../components/UserProvider'
import AppHeader from '../components/AppHeader'


const GlobalStyle = createGlobalStyle`
  html,
  body {
    background: ${themeGet(`colors.bg.canvas`)};
    color: ${themeGet(`colors.text.primary`)};
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider colorMode='night'>
        <GlobalStyle/>
        <UserProvider user={{}}>
          <AppHeader/>
          <Component {...pageProps} />
        </UserProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
