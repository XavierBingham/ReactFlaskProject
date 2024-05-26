//Icons
import { Person, ShoppingCart } from '@mui/icons-material';

//Components
import ControlButton from '../ControlButton/ControlButton';
import ManageDropdown from '../ManageDropdown/ManageDropdown';

//Styles
import './LoggedInControls.css'
import { useRef, useState } from 'react';

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
            id="profile-button"
            title="Manage"
            handleClick={toggleManageMenu}
            ref={profileButtonRef}
        >
            <Person/>
        </ControlButton>

        <ControlButton
            id="cart-button"
            title="My Cart"
        >
            <ShoppingCart/>
        </ControlButton>

        <ManageDropdown
            open={manageMenuOpen}
            onClose={toggleManageMenu}
            anchorEl={profileButtonRef.current}
        />

    </div>

}

export default LoggedInControls;