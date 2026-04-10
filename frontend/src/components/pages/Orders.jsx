import { useState, useEffect } from 'react'
import {useAuth} from '../../context/AuthContext.jsx';
import { API_URL } from '../../api'

const Orders =()=>{
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const userId = user?.id;


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/order/user/${userId}`);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userId]);



  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Order History</h1>

            {orders.map((order) => (
                <div key={order.id} className="border border-[#FF1212] p-4 rounded-lg mb-4">
                
                <div className="flex justify-between text-black">
                    <p>Order #{order.id}</p>
                    <p>Status: {order.status}</p>
                </div>

                <div className="mt-3">
        {order.items.map((item) => {
        const toppingsTotal = item.toppings? item.toppings.reduce((sum, t) => sum + t.topping.price, 0): 0;

        const itemTotal = (item.menuItem.price + toppingsTotal) * item.quantity;

        return (
            <div key={item.id} className="py-1">
            <div className="flex justify-between">
                <span>
                {item.menuItem.name} x {item.quantity}
                </span>

                <span>${itemTotal.toFixed(2)}</span>
            </div>

            {item.toppings?.length > 0 && (
                <div className="text-xs text-gray-500 ml-2">
                + {item.toppings.map(t => t.topping.name).join(", ")}
                </div>
            )}
            </div>
        );
        })}
          </div>

          <div className="mt-2 font-semibold">
            Total: ${order.total.toFixed(3)}
          </div>

        </div>
      ))}
    </div>
  );
};



export default Orders;