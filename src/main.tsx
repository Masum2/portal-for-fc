import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
    //"Local": "data source=tcp:beraten.database.windows.net, 1433;initial catalog=RedLakeDb;User ID=Wesam; Password=Othman**!@#;",
