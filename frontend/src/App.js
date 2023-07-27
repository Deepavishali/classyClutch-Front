import './App.css';
import  Checkout  from './components/Checkout';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home.js'
import { Signup } from './components/Signup.js'
import { Login } from './components/Login.js'
import { BagsList } from './components/BagsList.js'
import { BagDetails } from './components/BagDetails.js'
import AddBags from './components/AddBags.js'
import Cart from './components/Cart.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { OrderSuccess } from './components/OrderSuccess';
import { NotFound } from './components/NotFound';
function App() {
  
  const token = localStorage.getItem("Authorization")
  return (
    <div className="App">
      <div className='routes-container'>
      <ToastContainer />
        <Routes>
        {
           token ? 
                <Route path='/bags/menu' element={<BagsList/>}/>
              :
                <Route path='/users/login' element={<Login/>}/>
         }
          <Route path='/' element={<Home />} />
          <Route path='/users/Signup' element={<Signup />} />
          <Route path='/users/login' element={<Login />} />
          <Route path='/bags/menu/:username' element={<BagsList />} />
          <Route path='/bags/menu/cart' element={<Cart />} />
          <Route path='/bags/add' element={<AddBags />} />
          <Route path='/bags/menu/:username/:id' element={<BagDetails />} />
          <Route path='/bags/menu/cart/checkout' element={<Checkout/>}/>
          <Route path='/bags/menu/cart/checkout/orderSuccess' element={<OrderSuccess/>}/>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

