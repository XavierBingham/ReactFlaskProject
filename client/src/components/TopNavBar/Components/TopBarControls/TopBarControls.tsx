//Imports
import { useContext, useRef, useState } from 'react';
import { Person, ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { DataContext } from '../../../../pages/Core/DataContext';

//Components
import ControlButton from '../ControlButton/ControlButton';

//Styles
import './TopBarControls.css'

//Component
function LoggedInControls() {

    const dataModules = useContext(DataContext)!;
    const userSession = dataModules?.session.getSession();

    //Component
    return <div id="logged-in-controls" className="account-controls">
        
        <Link to="/cart">
            <ControlButton
                id="cart-button"
                title="My Cart"
            >
                <ShoppingCart/>
            </ControlButton>
        </Link>

        <Link to={userSession !== undefined ? "/account" : "/login"}>
            <ControlButton
                id="profile-button"
                title="Account"
            >
                <Person/>
            </ControlButton>
        </Link>

    </div>

}

export default LoggedInControls;