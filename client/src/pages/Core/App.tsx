//Imports
import {useEffect, useRef, useState, lazy, Suspense} from 'react';
import { BrowserRouter, NavigateFunction, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { DataContext, DataWrapper } from './DataContext';
import AccountManager from './DataModules/AccountManager';
import { GetCSRF } from '../../api/AccountResolver';
import CacheManager from './DataModules/CacheManager';
import LoadManager from './DataModules/LoadManager';
import EndpointManager from './DataModules/EndpointManager';

//Styles
import '../../styles/Global.css';
import '../../styles/GlobalAnimations.css';

//Components
import FallbackPage from '../../components/FallbackPage/FallbackPage';
import TopNavBar from '../../components/TopNavBar/TopNavBar';
const AccountLogin = lazy(() => import('../../components/AccountLogin/AccountLogin'));
const ProductSearch = lazy(() => import('../../components/ProductSearch/ProductSearch'));
const Cart = lazy(() => import('../../components/Cart/Cart'));
const Checkout = lazy(() => import('../../components/Checkout/Checkout'));
const AccountCreate = lazy(() => import('../../components/AccountCreate/AccountCreate'));
const Account = lazy(() => import('../../components/Account/Account'));
const ProductView = lazy(() => import('../../components/ProductView/ProductView'));

function App() {

  const contentRef = useRef<HTMLDivElement>(null);
  const [dataModules, setDataModules] = useState<DataWrapper|null>(null);
  const navigator = useNavigate();
  const location = useLocation();

  //Initial loading
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

    //Load modules into each module
    for(let [_,module] of Object.entries(loadedModules)){
      module.setModules(loadedModules);
    }

    //Load modules + get CSRF session token
    setDataModules(loadedModules);
    GetCSRF(loadedModules);

    //Recheck if current session is valid
    loadedModules.endpoint.Reauthenticate();

  }, [])

  //Listen on route change
  useEffect(() => {
    
    //Recheck if current session is valid
    dataModules?.endpoint.Reauthenticate();

  }, [location])
  
  return (
    <div ref={contentRef}>
      <DataContext.Provider value={dataModules!}>
          <TopNavBar/>
          <Suspense fallback={<></>}>
            <div id="page-content">
              <Routes>
                <Route path="/" element={<ProductSearch/>}/>
                <Route path="products" element={<ProductSearch/>}/>
                <Route path="products/:id" element={<ProductView/>}/>
                <Route path="login" element={<AccountLogin/>}/>
                <Route path="signup" element={<AccountCreate/>}/>
                <Route path="cart" element={<Cart/>}/>
                <Route path="account" element={<Account/>}/>
                <Route path="checkout" element={<Checkout/>}/>
                <Route path="*" element={<FallbackPage/>}/>
              </Routes>
            </div>
          </Suspense>
      </DataContext.Provider>
    </div>
  );

}

export default App;
