import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.tsx'
import { portfolioStore } from './store/portfolio'
import { ThemeProvider } from './components/ThemeProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={portfolioStore}>
      <ThemeProvider defaultTheme="light" storageKey="showwork-ui-theme">
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
