//Imports
import config from '../../config';
import { useState, useEffect, useRef } from 'react';

//Components
import LoggedOutControls from './Components/LoggedOutControls/LoggedOutControls';
import LoggedInControls from './Components/LoggedInControls/LoggedInControls';
import { Menu } from '@mui/icons-material';
import ControlButton from './Components/ControlButton/ControlButton';
import SideNavBar from '../SideNavBar/SideNavBar';

//Styles
import './TopNavBar.css'

//Component
function TopNavBar() {

    //State
    let [sideNavOpen, setSideNavOpen] = useState<boolean>(false);
    
    //Vars
    const sideNavBarRef = useRef<HTMLDivElement>(null);

    //Methods
    const toggleSideNav = (event?:React.MouseEvent<HTMLButtonElement>) => {
        if(event){
            event.stopPropagation();
        }
        setSideNavOpen(state => !state);
    }

    const documentClick = (event:MouseEvent) => {
        if(!sideNavOpen){return;}
        if(sideNavBarRef.current && !sideNavBarRef.current.contains(event.target as HTMLElement)){
            toggleSideNav();
        }
    }

    useEffect(() => {
        document.addEventListener("click", documentClick);
        return () => {
            document.removeEventListener("click", documentClick);
        };
    }, [sideNavOpen]);

    return (
        <div id="nav">
            <div id="header-nav">
                <ControlButton id="menu-toggle" handleClick={toggleSideNav}>
                    <Menu/>
                </ControlButton>
                <a href="/">
                    <h1 id="app-name">{config.APP_NAME}</h1>
                </a>
                <LoggedInControls/>
            </div>
            <SideNavBar ref={sideNavBarRef} enabled={sideNavOpen}/>
        </div>
    )

}

export default TopNavBar;