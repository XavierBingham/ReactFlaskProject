//Imports
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

//Components
import NavAccordion from './Components/NavAccordion/NavAccordion';

//Styles
import './SideNavBar.css';

//Component
function SideNavBar() {
    return (
        <div id="side-nav">
            <div id="side-nav-bg"></div>
            <NavAccordion/>
            <NavAccordion/>
            <NavAccordion/>
        </div>
    );
}

export default SideNavBar;