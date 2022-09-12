import React, { Component, Suspense, useState } from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './scss/style.scss'
import ProtectedRoutes from './Privateroutes'
import { data } from './Context'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

function App() {
  return (
    <Context.Provider value={data}>
      <Router>
        <Suspense fallback={loading}>
          <Routes>
            <Route path="/login" name="Home" element={<Login />} />
            <Route to="/login" element={<ProtectedRoutes />}>
              <Route path="/*" name="Home" element={<DefaultLayout />} />
              <Route exact path="/register" name="Register Page" element={<Register />} />
              <Route exact path="/404" name="Page 404" element={<Page404 />} />
              <Route exact path="/notfound" name="Page 500" element={<Page500 />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </Context.Provider>
  )
}
export const Context = React.createContext()
export default App
