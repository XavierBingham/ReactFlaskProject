//Imports
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { forwardRef, ForwardedRef } from 'react';

//Components
import NavAccordion from './Components/NavAccordion/NavAccordion';

//Styles
import './SideNavBar.css';

//Component
const SideNavBar = forwardRef((props:{enabled:boolean}, ref:ForwardedRef<HTMLDivElement>) => {

    const { enabled } = props;

    return (
        <div id="side-nav" className={`${enabled?"enabled":"disabled"}`}>
            <div ref={ref} id="side-nav-bg">
                <NavAccordion/>
                <NavAccordion/>
                <NavAccordion/>
            </div>
        </div>
    );

});

export default SideNavBar;