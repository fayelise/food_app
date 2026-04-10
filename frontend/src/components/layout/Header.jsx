import logo from "../../assets/logo.png";
import profil from "../../assets/profil.png";
import {useAuth} from '../../context/AuthContext.jsx';
import ProfilDropdown from '../ui/ProfilDropdown.jsx';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowUp, MdKeyboardArrowDown, MdShoppingCart } from "react-icons/md";
import { useCart } from "../../context/CartContext.jsx";


const Header = () => {
    const {user} = useAuth();
    const { cart } = useCart();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    return (
    <header className="w-full flex justify-between items-center p-2 shadow-md shadow-gray-500 top-0 left-0 z-20 bg-white ">
       {user ?
       <>
        <div className="flex items-center gap-2">
            <Link to="/dashboard"><img src={logo} alt="bible" className="w-24 md:w-28" /></Link>
            <Link to="/dashboard"><h1 className="text-gray-700 text-xl font-bold">Foodie App</h1></Link>
        </div>
        <div className="flex items-center gap-4">
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-[#FF1212] transition-colors">
                <MdShoppingCart className="w-8 h-8" />
                {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#FF1212] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {cart.length}
                    </span>
                )}
            </Link>
            <div className="relative flex grid grid-cols-3 items-center gap-4 w-56 h-16 border border-[#FF1212] rounded-full p-1 shadow-lg">            
                    <img src={profil}  alt="profil" className="w-14 h-14 rounded-full" />
                    <span className="text-[#FF1212] text-sm">{user?.email?.split("@")[0]}</span>
                {isDropdownOpen ? <MdKeyboardArrowUp className=" w-10 h-10 text-black" onClick={() => setIsDropdownOpen(!isDropdownOpen)} /> : <MdKeyboardArrowDown className=" w-10 h-10 text-black" onClick={() => setIsDropdownOpen(!isDropdownOpen)} />}
                {isDropdownOpen && <ProfilDropdown />}
            </div>
        </div> </> : 
        <>
        <div className="flex items-center gap-2">
            <Link to="/"><img src={logo} alt="bible" className="w-24 md:w-28" /></Link>
            <Link to="/"><h1 className="text-gray-700 text-xl font-bold">Foodie App</h1></Link>
        </div>
        <div className="relative flex grid grid-cols-2 items-center gap-4">            
                <Link to="/login"><button className="mt-6 bg-[#FF1212] text-white font-medium py-3 px-6 w-36 h-12 rounded-lg">Login</button></Link>
                <Link to="/register"><button className="mt-6 bg-[#FF1212] text-white font-medium py-3 px-6 w-36 h-12 rounded-lg">Register</button></Link>
        </div></>
    }
    </header>
)
}

export default Header