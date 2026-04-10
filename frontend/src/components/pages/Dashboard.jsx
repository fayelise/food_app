import Card from '../ui/Card.jsx'
import { useState, useEffect } from 'react'
import { API_URL } from '../../api'
import CategorySlider from '../ui/CategorySlider.jsx'

const Dashboard = () => {
  const [data, setData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {
  const fetchMenu = async () => {
    let url = `${API_URL}/menu`;

    if (selectedCategory && selectedCategory !== "All") {
      url = `${API_URL}/menu/category/${selectedCategory.toLowerCase()}`;
    }

    const response = await fetch(url);
    const result = await response.json();
    setData(result);
  };

  fetchMenu();
}, [selectedCategory]);


  return (
    <div >
      <div className='flex flex-col items-center justify-center m-6'>
        <CategorySlider onSelectCategory={setSelectedCategory}/>

      <div className="w-full flex items-center justify-center m-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={`${API_URL}${item.image}`}
            />
          ))}
        </div>
      </div>
      </div>
      

    </div>
  )
}

export default Dashboard