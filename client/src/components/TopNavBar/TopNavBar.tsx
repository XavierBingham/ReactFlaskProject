//Imports
import config from '../../config';

//Components
import LoggedOutControls from './Components/LoggedOutControls/LoggedOutControls';
import LoggedInControls from './Components/LoggedInControls/LoggedInControls';
import { Menu } from '@mui/icons-material';
import ControlButton from './Components/ControlButton/ControlButton';

//Styles
import './TopNavBar.css'

//Component
function TopNavBar() {

    return (
        <div id="header-nav">
            <ControlButton id="menu-toggle">
                <Menu/>
            </ControlButton>
            <a href="/">
                <h1 id="app-name">{config.APP_NAME}</h1>
            </a>
            <LoggedInControls/>
        </div>
    )

}

export default TopNavBar;