import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import App from './App.jsx'
import Layout from './component/layout/Layout.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './component/redux/store/store'
import { Provider } from 'react-redux'
import Login from './component/auth/Login.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Login />} />
      <Route path='/*' element={<App />} />
    </Route>
  ))

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>

  </React.StrictMode>)