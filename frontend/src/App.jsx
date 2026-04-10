import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './components/auth/Login.jsx'
import Register from './components/auth/Register.jsx'
import Home from './components/pages/Home.jsx'
import Dashboard from './components/pages/Dashboard.jsx'
import Layout from './components/layout/Layout.jsx'
import RequireAuth from './components/auth/RequireAuth.jsx'
import Element from './components/pages/Element.jsx'
import Cart from './components/pages/Cart.jsx'
import Orders from './components/pages/Orders.jsx'
import { CartProvider } from './context/CartContext.jsx'
import {useAuth} from "./context/AuthContext.jsx";




function App() {

  const {user} = useAuth();

  return (
    <CartProvider>  
    <BrowserRouter>
      <Routes>
        
        <Route element={<Layout />} >
        <Route path="/"  element={user ? <Navigate to="/dashboard" replace /> : <Home />}  />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<RequireAuth><Layout /></RequireAuth>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/element/:id" element={<Element />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </CartProvider>
  )
}

export default App
