//Imports
import {useEffect, useRef, useState} from 'react';
import { BrowserRouter, NavigateFunction, Route, Routes, useNavigate } from 'react-router-dom';
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
import Account from '../../components/Account/Account';
import EndpointManager from './DataModules/EndpointManager';

function App() {

  const contentRef = useRef<HTMLDivElement>(null);
  const [dataModules, setDataModules] = useState<DataWrapper|null>(null);
  const navigator = useNavigate();

  useEffect(() => {

    const navigatorWrapper = (directory:string) => {
      navigator(directory);
    }

    const loadedModules = {
      session: new AccountManager(contentRef),
      cache: new CacheManager(contentRef),
      loader: new LoadManager(contentRef),
      endpoint: new EndpointManager(contentRef, navigatorWrapper),
    }

    for(let [_,module] of Object.entries(loadedModules)){
      module.setModules(loadedModules);
    }
    setDataModules(loadedModules);
    GetCSRF(loadedModules);

  }, [])
  
  return (
    <div ref={contentRef}>
      <DataContext.Provider value={dataModules!}>
          <TopNavBar/>
          <div id="page-content">
            <Routes>
              <Route path="/" element={<ProductSearch/>}/>
              <Route path="products" element={<ProductSearch/>}/>
              <Route path="login" element={<AccountLogin/>}/>
              <Route path="signup" element={<AccountCreate/>}/>
              <Route path="cart" element={<Cart/>}/>
              <Route path="account" element={<Account/>}/>
              <Route path="checkout" element={<Checkout/>}/>
            </Routes>
          </div>
      </DataContext.Provider>
    </div>
  );

}

export default App;
