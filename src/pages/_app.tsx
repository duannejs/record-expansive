import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import stage from '../redux/index'
import RouterConfig from './routesConfig'
import SnackBar from '../component/SnackBar'
import '../i18n';
import Theme from './theme'

function MyApp({ Component, pageProps, router }: AppProps) {

  return (
    <>
      <Head>
        <title>VM Record Expense</title>
      </Head>
      <Provider store={stage.store}>
        <PersistGate persistor={stage._persistStore} loading={null}>
          <Theme>
            <SnackBar />
            <RouterConfig />
            {/** TODO: progress */}
            {/** TODO: modal/message */}
          </Theme>
        </PersistGate>
      </Provider>
    </>
  )


}

export default MyApp
