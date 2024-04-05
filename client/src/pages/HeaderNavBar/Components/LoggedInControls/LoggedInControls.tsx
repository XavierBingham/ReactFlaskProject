//Icons
import { Person, ShoppingCart } from '@material-ui/icons';

//Components
import ControlButton from '../ControlButton/ControlButton';

//Styles
import './LoggedInControls.css'

//Component
function LoggedInControls() {
    return <div id="controls">
        <ControlButton id="profile-button">
            <Person/>
        </ControlButton>
        <ControlButton id="cart-button">
            <ShoppingCart/>
        </ControlButton>
    </div>
}

export default LoggedInControls;