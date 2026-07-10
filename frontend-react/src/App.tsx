import {Outlet, useNavigate} from 'react-router-dom'
import {useState} from "react";

function App() {
    const navigate = useNavigate()

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  return (
      <div className={`w-full h-screen bg-slate-50 text-slate-800 antialiased`}>

          <nav className={`sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm shadow-slate-100/40 px-6 py-4`}>

              <div className={`flex items-center justify-between max-w-6xl mx-auto`}>

                  <span onClick={() => navigate(isLoggedIn ? '/dashboard' : '/')}
                        className={`font-bold text-xl text-sky-400 tracking-tight hover:text-sky-500 hover:scale-105 transition cursor-pointer`}
                  >To-Do App</span>

                  {!isLoggedIn ? (
                      <div className={`flex items-center gap-4`}>

                          <span onClick={() => navigate("/login")}
                                className={`text-sm font-medium hover:text-slate-900 hover:scale-105 cursor-pointer transition`}
                          >Login</span>

                          <span onClick={() => navigate("/register")}
                                className={`text-sm font-medium text-white bg-sky-400 hover:bg-sky-500 hover:scale-105 px-4 py-2 rounded-lg transition cursor-pointer`}
                          >Register</span>

                      </div>
                  ) : (
                      <div className={`flex items-center gap-4`}>

                          <span onClick={() => navigate("/profile")}
                                className={`text-sm font-medium hover:text-slate-900 cursor-pointer transition`}
                          >My Profile</span>

                          <span onClick={() => setIsLoggedIn(false)}
                                className={`text-sm font-medium text-white bg-rose-400 hover:bg-rose-500 hover:scale-105 px-4 py-2 rounded-lg transition cursor-pointer`}
                          >Log out</span>

                      </div>
                  )}

              </div>

          </nav>

          <main className={`max-w-6xl mx-auto p-6`}>
              <Outlet />
          </main>
      </div>
  )
}

export default App
