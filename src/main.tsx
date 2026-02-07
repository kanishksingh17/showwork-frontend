import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.tsx'
import { portfolioStore } from './store/portfolio'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={portfolioStore}>
      <App />
    </Provider>
  </StrictMode>,
)
