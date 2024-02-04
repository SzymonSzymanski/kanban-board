import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'

import { Provider } from 'react-redux'
import { store } from './store/store.ts'

import { App } from './App.tsx'

import '@styles/index.scss'
import '@styles/normalize.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
