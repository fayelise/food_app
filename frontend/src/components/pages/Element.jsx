import Card from '../ui/Card.jsx'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect} from 'react'
import { API_URL } from '../../api'
import { useCart } from '../../context/CartContext.jsx'

const TOPPING_CATEGORIES = ['burger', 'chicken', 'pizza']

const Element = () => {
    const [menuItem, setMenuItem] = useState(null);
    const { id } = useParams();
    const [toppings, setToppings] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [selectedToppings, setSelectedToppings] = useState([]);
    const [addedToCart, setAddedToCart] = useState(false);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({
            id: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            image: menuItem.image,
            quantity: quantity,
            toppings: selectedToppings
        });
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const getToppingCount = (id) => {
        return selectedToppings.filter(t => t.id === id).length;
    };

    const addTopping = (topping) => {
        setSelectedToppings([...selectedToppings, topping]);
    };

    const removeTopping = (id) => {
        const index = selectedToppings.findIndex(t => t.id === id);
        if (index > -1) {
            const newToppings = [...selectedToppings];
            newToppings.splice(index, 1);
            setSelectedToppings(newToppings);
        }
    };

    useEffect(() => {
        setSelectedToppings([])
    }, [id])

    useEffect(() => {
        const fetchMenuItem = async () => {
            try {
                const response = await fetch(`${API_URL}/menu/${id}`);
                const data = await response.json();
                setMenuItem(data);
            } catch (error) {
                console.error("Error fetching menu item:", error);
            }
        };
        fetchMenuItem();
    }, [id]);

    useEffect(() => {
        if (!menuItem?.category) return
        const allowed = TOPPING_CATEGORIES.includes(menuItem.category.toLowerCase())
        if (!allowed) {
            setToppings([])
            return
        }
        const fetchToppings = async () => {
            const res = await fetch(`${API_URL}/topping`)
            const data = await res.json()
            setToppings(data)
        }
        fetchToppings()
    }, [menuItem?.id, menuItem?.category])

    const showToppings =
        menuItem?.category &&
        TOPPING_CATEGORIES.includes(menuItem.category.toLowerCase())
   
    return (
  <div className='py-12 px-4 sm:px-6 lg:px-8'>
    <div className=' bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50'>
        <div className="flex items-center justify-center rounded-2xl shadow-2xl ring-4 ring-white/50">
          <img src={`${API_URL}${menuItem?.image}`} alt={menuItem?.name} className=" h-72 sm:h-96 object-cover " />
        </div>
        <div className='flex flex-row items-center justify-between gap-6'>
            <div>
            <h2 className="text-3xl sm:text-4xl font-bold  drop-shadow-lg mt-6 tracking-tight">{menuItem?.name}</h2>
                <p className="text-gray-600/90 leading-relaxed text-base sm:text-lg mt-4 max-w-prose">{menuItem?.description}</p>
            </div>
            <p className="text-3xl font-black bg-gradient-to-r from-[#FF1212] to-red-600 bg-clip-text text-transparent drop-shadow-xl mt-6">${menuItem?.price}</p>      
        </div>
        <div className="flex items-center gap-4 mt-6">

     <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 font-bold text-lg">- </button>
         <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 font-bold text-lg">+</button>
     </div>
      {showToppings && (
      <div className="py-8 border-t border-gray-100 mt-10 m-5">
      <div className="flex gap-4 overflow-x-auto pb-4">
        {toppings.map((topping) => (
        <div key={topping.id} className="w-[130px] rounded-2xl shadow-md hover:shadow-xl border border-[#FF1212]/30 hover:scale-105 transition-all duration-300 flex-shrink-0 overflow-hidden">
            <div className="bg-white h-[80px] flex items-center justify-center">
            <img src={`${API_URL}${topping.image}`} className="w-14 h-14 object-contain"/></div>
            <div className="bg-[#3C2F2F] h-[50px] flex items-center justify-between px-3 relative">
            <span className="text-sm font-medium text-white">{topping.name}</span>
            <span className="text-xs font-medium text-white">${topping.price}</span>
            <div className="absolute right-3 -top-4 flex gap-1">
                {getToppingCount(topping.id) > 0 && (
                    <button onClick={() => removeTopping(topping.id)} className="bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-gray-800 font-bold shadow-md transition">-</button>
                )}
                <button onClick={() => addTopping(topping)} className="bg-[#FF1212] hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold shadow-md transition">
                    {getToppingCount(topping.id) > 0 ? getToppingCount(topping.id) : "+"}
                </button>
            </div>
            </div>
        </div>
        ))}
    </div>
    </div>
      )}
      <div className="flex items-center justify-center relative">
        <button onClick={handleAddToCart} className={`${addedToCart ? 'bg-green-600' : 'bg-gradient-to-r from-[#FF1212] to-red-600 hover:from-red-600 hover:to-[#FF1212]'} text-white font-semibold py-4 px-8 w-full sm:w-48 h-14 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-red-500/30 active:scale-95 transition-all duration-300 flex items-center justify-center`}>
            {addedToCart ? (
                <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    Added!
                </span>
            ) : "Add to cart"}
        </button>
      </div>
    </div>
  </div>
);

}
export default Element