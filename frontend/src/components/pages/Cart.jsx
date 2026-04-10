import { useCart } from "../../context/CartContext";
import {useAuth} from "../../context/AuthContext";
import { API_URL } from "../../api";
import { FaRegTrashAlt } from "react-icons/fa";
import Popup from "../ui/Popup.jsx";
import { useState } from "react";

const DAKAR_DEPARTMENTS = {
  Dakar: [
    "Plateau",
    "Médina",
    "Fann-Point E-Amitié",
    "Gueule Tapée-Fass-Colobane",
    "Grand Dakar",
    "Parcelles Assainies",
    "HLM",
    "Ngor",
    "Ouakam",
    "Yoff",
    "Mermoz-Sacré-Cœur",
    "Liberté",
    "Dieuppeul-Derklé"
  ],
  Pikine: [
    "Pikine Est",
    "Pikine Ouest",
    "Pikine Nord",
    "Dagoudane Pikine",
    "Thiaroye",
    "Diamaguène Sicap Mbao",
    "Mbao"
  ],
  Rufisque: ["Rufisque Est", "Rufisque Ouest", "Rufisque Nord", "Bargny", "Sendou", "Sébikotane"],
  Guediawaye: ["Golf Sud", "Médina Gounass", "Ndiarème Limamoulaye", "Sam Notaire", "Wakhinane Nimzatt"]
};

const Cart = () => {
  const { cart, increaseQty, decreaseQty, removeItem, clearCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderMessage, setOrderMessage] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);
  const {user} = useAuth();

  const [department, setDepartment] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [phone, setPhone] = useState("");
  
  const total = cart.reduce((acc, item) => {
  const toppingsTotal = item.toppings 
    ? item.toppings.reduce((sum, t) => sum + t.price, 0)
    : 0;
  return acc + (item.price + toppingsTotal) * item.quantity;
}, 0);


const handleOrder = async () => {
  try {
    // prepare items with toppings for backend
    const itemsForBackend = cart.map(item => ({
      menuItemId: item.id,             
      quantity: item.quantity,
      toppings: item.toppings?.map(t => ({ id: t.id })) || []  
    }));
    const totalWithToppings = cart.reduce((acc, item) => {
      const toppingsTotal = item.toppings
        ? item.toppings.reduce((sum, t) => sum + t.price, 0)
        : 0;
      return acc + (item.price + toppingsTotal) * item.quantity;
    }, 0);

    const response = await fetch(`${API_URL}/order/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,       
        items: itemsForBackend,
        total: totalWithToppings
      })
    });
     

    const data = await response.json();
    console.log("Order created:", data);

  } catch (error) {
    console.error("Error placing order:", error);
  }
};

  const handleConfirm = () => {
      setIsModalOpen(false);

      setOrderTotal(total);
      setOrderMessage(true);

      handleOrder(); 
      clearCart();

      setTimeout(() => {
        setOrderMessage(false);
      }, 3000);
    };


  return (
    <div className="max-w-3xl mx-auto py-10 flex flex-col items-center">
        <div className="w-full border-b border-gray-200 mb-6 shadow-md p-4 rounded-xl">
            <h1 className="text-3xl font-bold mb-6 text-center text-[#FF1212]">Cart</h1>
           {cart.map((item, index) => (
            <div key={index} className="border p-4 rounded-xl mb-4 flex gap-4">
                <img src={`${API_URL}${item?.image}`} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                    <h2 className="font-semibold">{item.name}</h2>
                    {item.toppings && item.toppings.length > 0 && (
                      <div className="text-xs text-gray-500 mt-1">
                        Toppings: {item.toppings.map((t) => t.name).join(", ")}
                      </div>
                    )}
                    <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => decreaseQty(index)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(index)}>+</button>
                    </div>
                </div>
                <button onClick={() => removeItem(index)} className="text-red-500"><FaRegTrashAlt />
                </button>
            </div>
           ))}
          <div className="flex items-center justify-center">
            <button onClick={() => setIsModalOpen(true)} className={cart.length === 0 ? "bg-gray-400 text-white px-4 py-2 rounded-md cursor-not-allowed" : "bg-[#FF1212] text-white px-4 py-2 rounded-md"} disabled={cart.length === 0}>Checkout</button>
          </div>
          <Popup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h2 className="text-2xl font-bold mb-4 text-center">Checkout</h2>
            <div className="flex flex-col gap-4">
              <select value={department} onChange={(e) => {setDepartment(e.target.value);
                  setNeighborhood("");}} className="border border-gray-300 px-4 py-2 rounded-md w-full">
                <option value="" disabled>Choose your department</option>
                {Object.keys(DAKAR_DEPARTMENTS).map((dep) => (
                  <option key={dep} value={dep}>
                    {dep}
                  </option>
                ))}
              </select>

              <select value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)}
                disabled={!department}className="border border-gray-300 px-4 py-2 rounded-md w-full disabled:bg-gray-100 disabled:text-gray-500">
                <option value="" disabled> {department ? "Choose your neighborhood" : "Select a department first"}
                </option>
                {(DAKAR_DEPARTMENTS[department] || []).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Choose your street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
              />
              <input
                type="text"
                placeholder="Enter your house number"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
              />
              <input
                type="text"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded-md w-full"
              />
            </div>
            <p className="text-lg">Total: ${total.toFixed(2)}</p>
            <div className="flex items-center justify-center">
              <button onClick={handleConfirm} className="bg-[#FF1212] text-white px-4 py-2 rounded-md">Confirm</button>
            </div>
          </Popup>
          <Popup isOpen={orderMessage} onClose={() => setOrderMessage(false)}>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                Order Confirmed 
              </h2>
              <p>Hi {user?.email?.split("@")[0]}, your order is being prepared.</p>
              <p className="text-lg">Total: ${orderTotal.toFixed(2)}</p>
              <p className="text-gray-500 mt-2">
                Estimated delivery: 20 - 30 minutes
              </p>
            </div>
          </Popup>
        </div>
    </div>
  );
};

export default Cart;