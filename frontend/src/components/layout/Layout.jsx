import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { Outlet } from 'react-router-dom';


const Layout = ({}) => {
   return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1  bg-cover bg-center">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  )
}
export default Layout;