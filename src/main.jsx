import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { To_Do_ListContextProvider } from './context/To_Do_ListContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <To_Do_ListContextProvider>
    <App />
    </To_Do_ListContextProvider>
  </StrictMode>,
)
