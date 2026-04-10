import {Link, useNavigate} from 'react-router-dom'
import { FaShoppingCart, FaSignOutAlt, FaHistory } from "react-icons/fa";
import {useAuth} from '../../context/AuthContext.jsx';

const ProfilDropdown = () => {
  const {user, logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  }


  return (
    <div className="absolute top-full right-3  w-64 bg-white border border-gray-200 p-2 rounded-xl shadow-xl z-50">
        <div className="flex items-center gap-3 p-3 border-b border-gray-200">
            
            <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-800">
                {user?.email?.split("@")[0]}
            </span>
            <span className="text-xs text-gray-500">{user?.email}</span>
            </div>
       </div>

       <div className="py-2">

        <Link to="/cart" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition"><FaShoppingCart className="text-gray-500" />MyCart</Link>
        <Link to="/orders" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition"><FaHistory className="text-gray-500" />MyOrders</Link>
      </div>
      <div className="border-t border-gray-200 my-2"></div>
      <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition"><FaSignOutAlt />Sign out</button>
    </div>
  );
};

export default ProfilDropdown