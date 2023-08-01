import React from 'react'
import AppRouter from './router/appRouter'
import VideoContextProvider from './contextApi/VideoContextApi'
import { AuthProvider } from "./contextApi/appContext"

const App = () => {
  return (
    <VideoContextProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>,
    </VideoContextProvider>
  )
}

export default App
