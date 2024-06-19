//Icons
import { Person, ShoppingCart } from '@mui/icons-material';

//Components
import ControlButton from '../ControlButton/ControlButton';
import ManageDropdown from '../ManageDropdown/ManageDropdown';

//Styles
import './TopBarControls.css'
import { useRef, useState } from 'react';
import { MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

//Component
function LoggedInControls() {

    //State
    const [manageMenuOpen, setManageMenuOpen] = useState<boolean>(false);
    const profileButtonRef = useRef<HTMLButtonElement>(null);

    //Methods
    const toggleManageMenu = () => {
        setManageMenuOpen((state) => !state);
    };

    //Component
    return <div id="logged-in-controls" className="account-controls">

        <ControlButton
            id="cart-button"
            title="My Cart"
        >
            <ShoppingCart/>
        </ControlButton>
        
        <Link to="/account">
            <ControlButton
                id="profile-button"
                title="Account"
                handleClick={toggleManageMenu}
                ref={profileButtonRef}
            >
                <Person/>
            </ControlButton>
        </Link>

    </div>

}

export default LoggedInControls;