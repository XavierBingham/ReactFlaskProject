//Icons
import { Person, ShoppingCart } from '@mui/icons-material';

//Components
import ControlButton from '../ControlButton/ControlButton';

//Styles
import './LoggedInControls.css'

//Component
function LoggedInControls() {
    return <div id="controls">
        <ControlButton id="profile-button" title="Options">
            <Person/>
        </ControlButton>
        <ControlButton id="cart-button" title="My Cart">
            <ShoppingCart/>
        </ControlButton>
    </div>
}

export default LoggedInControls;