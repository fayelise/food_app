import burger from '../../assets/baconator.png'
import chicken from '../../assets/mcchicken.png'
import fries from '../../assets/largefries.png'
import drink from '../../assets/strawberry.png'
import noodles from '../../assets/Vegetable Udon.png'
import pizza from '../../assets/pepperonipizza.png'
import dessert from '../../assets/chocolatechipcookie.png'
import  breakfast from '../../assets/baconegg.png'
import tenders from '../../assets/Classic Chicken Tenders.png'
import all from '../../assets/image.png'


const categories = [
  { id: 1, name: "All", image: all }, 
  { id: 2, name: "Burger", image: burger },
  { id: 3, name: "Chicken", image: chicken },
  { id: 4, name: "breakfast", image: breakfast },
  { id: 5, name: "Fries", image: fries },
  { id: 6, name: "Drink", image: drink },
  { id: 7, name: "Noodles", image: noodles },
  { id: 8, name: "Pizza", image: pizza },
  { id: 9, name: "tenders", image: tenders },
  { id: 10, name: "dessert", image: dessert },
];

const CategorySlider = ({ onSelectCategory }) => {
  return (
    <div className="w-full overflow-x-auto py-6 px-4 scrollbar-hide snap-x snap-mandatory scroll-smooth">
      <div className="flex gap-4 w-max mx-auto">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory?.(cat.name)}
            className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 bg-white shadow-md hover:shadow-lg rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:scale-105 transform transition-all duration-300 snap-center border border-gray-100 hover:border-[#FF1212]/30">
            <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
              <img src={cat.image} alt={cat.name} className="max-w-full max-h-full object-contain drop-shadow-sm" />
            </div>
            <p className="mt-2 text-[10px] sm:text-xs font-bold text-gray-700 uppercase tracking-wider">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySlider