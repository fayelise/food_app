import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaTiktok } from 'react-icons/fa6';


const Footer = () => {
  return (
    <footer className="w-full p-4 bottom-0 left-0 z-20 bg-white shadow-md shadow-gray-500 text-gray-700 text-center">
      <div className="flex flex-row items-center justify-between gap-8 flex-wrap">
        <div >
           <div className="flex  items-center  gap-2">
            <img src={logo} alt="Foodie App Logo" className="w-24 md:w-28" />
            <h1 className="text-2xl md:text-3xl font-bold">Kayy Thiopp</h1>
          </div>
           <p>
  
          </p>
        </div>
       
        <div>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg">Email: info@foodieapp.com</p>
          <p className="text-lg">Phone: +221 77 698 14 11</p>
        </div>

        <div>
        <h2 className="text-2xl font-bold mb-4 ">Follow Us</h2>
        <div className="flex items-center justify-center gap-8 flex-wrap ">
           <FaFacebook className="w-12 h-12  hover:text-gray-200 " />
           <FaTwitter className="w-12 h-12  hover:text-gray-200 " />
           <FaInstagram className="w-12 h-12  hover:text-gray-200 " />
           <FaTiktok className="w-12 h-12  hover:text-gray-200 " />
        </div>
        </div>
      </div>
      <p className="text-sm">
          &copy; 2026 Foodie App.
        </p>
    </footer>
  );
};

export default Footer