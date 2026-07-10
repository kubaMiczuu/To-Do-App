import { Outlet } from 'react-router-dom'

function App() {
  return (
      <div className={`w-full h-screen bg-slate-100 text-slate-800 antialiased`}>
          <main className={`max-w-6xl mx-auto p-6`}>
              <Outlet />
          </main>
      </div>
  )
}

export default App
