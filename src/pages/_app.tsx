import "@/styles/globals.css"
import { ThemeProvider } from "next-themes"
import { AppProps } from "next/app"
import Layout from "../layout"
export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}
