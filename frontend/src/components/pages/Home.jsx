import { Link } from 'react-router-dom'
import delivery from '../../assets/delivery.png'
import burger from '../../assets/burger.png'


const Home = () => {
  return (
    <div className="w-full min-h-screen flex flex-col ">
        <div className="grid grid-cols-2 h-screen bg-gradient-to-r from-[#FF939C] to-[#FF1212]">
          <div className="flex flex-col items-center justify-center">
              <h1 className="text-5xl md:text-7xl text-white mb-4">KAYY THIOPP</h1>
              <p className="text-lg md:text-2xl max-w-xl font-medium text-center text-white/90 drop-shadow-lg ">
                Juicy, stacked burgers made with premium beef, fresh toppings, and our secret sauce. 
                Delivered hot to your door in under 30 minutes. Order now and taste the difference!
              </p>
            
          </div>
          <div className="flex items-center justify-center">
            <img src={delivery} alt="delivery" className="w-full h-[80%]" />
          </div>
        </div>
        <div className="relative min-h-[70vh] grid grid-cols-2 bg-cover bg-no-repeat bg-center before:absolute before:inset-0 before:bg-white/60" style={{backgroundImage:`url(${burger})`}}>
          <div className="flex flex-col items-center justify-center gap-3 relative z-10 col-span-2">
            <p className="text-lg md:text-2xl max-w-xl text-center text-black">
              Come Order your favorite food from your favorite burger spot and get it delivered to your doorstep.
            </p>
            <Link to="/login" className="mt-6 bg-[#FF1212] text-white font-semibold rounded-full w-64 h-16 text-lg flex items-center justify-center">
              Get Started
            </Link>
          </div>

        </div>
    
    </div>
   
  )
}

export default Home