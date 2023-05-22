import React from 'react'
import AppRouter from './router/appRouter'
import VideoContextProvider from './contextApi/VideoContextApi'
const App = () => {
  return (
    <VideoContextProvider>
      <AppRouter />
    </VideoContextProvider>
  )
}

export default App
