import { Link } from 'react-router-dom'
const Card = ({ name, description, price, image, id }) => {
  return (
    <div className="group bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-xl shadow-cyan-500/50 p-6 flex flex-col items-center text-center hover:shadow-2xl hover:shadow-cyan-500 hover:-translate-y-2 hover:border-cyan-300 transition-all duration-300 w-full h-[420px]">
      <div className="w-full h-40 flex items-center justify-center mb-4">
        <img src={image} alt={name} className="w-full h-full object-contain rounded-lg"/>
      </div>
      <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">{name}</h2>

      <p className="text-gray-700 text-sm mb-4 ">{description}</p>

      <div className=" w-full flex flex-row justify-between mb-4">
        <p className=" text-gray-700 text-lg font-bold">${price}</p>
        <p className=" text-gray-700 text-lg font-bold">4.5⭐</p>
      </div>

      <div>
       <Link to={`/element/${id}`}><button className="bg-[#FF1212] text-white font-medium py-3 px-6 w-36 h-12 rounded-lg mt-4">View Details</button></Link>
      </div>
      <div className="mt-4 w-full h-1 bg-gradient-to-r from-[#FF939C] to-[#FF1212] rounded-full group-hover:scale-105 transition-transform" />
    </div>
  );
};

export default Card;