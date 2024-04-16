//Imports
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Styles
import '../../styles/Global.css';
import '../../styles/GlobalAnimations.css';

//Components
import TopNavBar from '../../components/TopNavBar/TopNavBar';
import AccountLogin from '../../components/AccountLogin/AccountLogin';
import ProductSearch from '../../components/ProductSearch/ProductSearch';
import Cart from '../../components/Cart/Cart';
import Checkout from '../../components/Checkout/Checkout';
import AccountCreate from '../../components/AccountCreate/AccountCreate';

type UserData = {
  id: number,
  firstName: string,
  lastName: string,
}

function App() {

  /*
  let [data, updateData]:[UserData[], any] = useState([]);
  
  const getData = async () => {
    await axios.get("/api/test")
    .then((res) => {
      const data = res.data.data;
      updateData(data);
    })
    .catch((err) => {
      console.error("Error fetching data", err);
    });
  };
  
  useEffect(() => {
    getData();
  }, []);
  */

  return (
    <div>
      <BrowserRouter>
      <TopNavBar/>
          <div id="page-content">
            <Routes>
              <Route path="/" element={<ProductSearch/>}/>
              <Route path="products" element={<ProductSearch/>}/>
              <Route path="login" element={<AccountLogin/>}/>
              <Route path="signup" element={<AccountCreate/>}/>
              <Route path="cart" element={<Cart/>}/>
              <Route path="checkout" element={<Checkout/>}/>
            </Routes>
          </div>
      </BrowserRouter>
    </div>
  );

}

export default App;
