//Icons
import { Person, ShoppingCart } from '@material-ui/icons';

//Styles
import './LoggedInControls.css'

//Component
function LoggedInControls() {
    return <div id="controls">
        <button id="profile-button" className="control-button">
            <Person/>
        </button>
        <button id="cart-button" className="control-button">
            <ShoppingCart/>
        </button>
    </div>
}

export default LoggedInControls;