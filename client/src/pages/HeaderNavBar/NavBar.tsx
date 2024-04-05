//Imports
import config from '../../config';

//Components
import LoggedOutControls from './LoggedOutControls/LoggedOutControls';
import LoggedInControls from './LoggedInControls/LoggedInControls';
import { Menu } from '@material-ui/icons';

//Styles
import './NavBar.css'

//Component
function NavBar() {

    return (
        <div id="header-nav">
            <button id="menu-toggle" className="control-button">
                <Menu/>
            </button>
            <a href="/">
                <h1 id="app-name">{config.APP_NAME}</h1>
            </a>
            <LoggedInControls/>
        </div>
    )

}

export default NavBar