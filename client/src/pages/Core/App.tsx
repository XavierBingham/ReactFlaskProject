//Imports
import {useEffect, useRef} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DataContext, DataWrapper } from './DataContext';
import AccountManager from './DataModules/AccountManager';
import { GetCSRF } from '../../api/AccountResolver';
import CacheManager from './DataModules/CacheManager';
import LoadManager from './DataModules/LoadManager';

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

  const contentRef = useRef<HTMLDivElement>(null);
 
  const Data:DataWrapper = {
    session: new AccountManager(contentRef),
    cache: new CacheManager(contentRef),
    loader: new LoadManager(contentRef),
  }

  useEffect(() => {
    GetCSRF();
  }, [])

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
