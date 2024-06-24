//Imports
import config from '../../config';
import { useState, useEffect, useRef, useContext } from 'react';

//Components
import TopBarControls from './Components/TopBarControls/TopBarControls';
import { Menu } from '@mui/icons-material';
import ControlButton from './Components/ControlButton/ControlButton';
import SideNavBar from '../SideNavBar/SideNavBar';
import { Link } from 'react-router-dom';

//Styles
import './TopNavBar.css'
import { DataContext } from '../../pages/Core/DataContext';

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
                <div style={{width:"100px"}}>
                    <ControlButton id="menu-toggle" title="Navigate" handleClick={toggleSideNav}>
                        <Menu/>
                    </ControlButton>
                </div>
                <Link to="/">
                    <h1 id="app-name">{config.APP_NAME}</h1>
                </Link>
                <TopBarControls/>
            </div>
            <SideNavBar ref={sideNavBarRef} enabled={sideNavOpen} onLinkClick={toggleSideNav}/>
        </div>
    )

}

export default TopNavBar;