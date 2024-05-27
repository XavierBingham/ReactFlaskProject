//Imports
import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DataContext, DataWrapper } from './DataContext';
import AccountManager from './DataModules/AccountManager';

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
import CacheManager from './DataModules/CacheManager';
import LoadManager from './DataModules/LoadManager';

type UserData = {
  id: number,
  firstName: string,
  lastName: string,
}

function App() {

  const contentRef = useRef<HTMLDivElement>(null);

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
 
  const Data:DataWrapper = {
    session: new AccountManager(contentRef),
    cache: new CacheManager(contentRef),
    loader: new LoadManager(contentRef),
  }

  return (
    <div ref={contentRef}>
      <DataContext.Provider value={Data}>
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
      </DataContext.Provider>
    </div>
  );

}

export default App;
