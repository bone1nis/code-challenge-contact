import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { CssBaseline, ThemeProvider } from '@mui/material'

import { RootStore } from './stores/RootStore.ts'
import { RootStoreContext } from './stores/RootStoreContext.ts'

import theme from './theme.ts'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RootStoreContext.Provider value={new RootStore()}>
        <CssBaseline />
        <App />
      </RootStoreContext.Provider>
    </ThemeProvider>
  </StrictMode>,
)