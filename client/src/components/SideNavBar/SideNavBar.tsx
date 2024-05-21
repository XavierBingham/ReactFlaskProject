//Imports
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { forwardRef, ForwardedRef, useRef, useState, useEffect } from 'react';
import Config from '../../config';

//Components
import { NavAccordion, NavLink } from './Components/NavAccordion/NavAccordion';

//Styles
import './SideNavBar.css';

//Component
const SideNavBar = forwardRef((props:{enabled:boolean}, ref:ForwardedRef<HTMLDivElement>) => {

    //State
    const [expandedId, setExpandedId] = useState<string|undefined>(undefined);

    //Vars
    const { enabled } = props;

    //Methods
    const expandSection = (id:string) => (event: React.SyntheticEvent<Element, Event>, expanded: boolean) => {
        if(expanded){
            setExpandedId(id);
        }else if(expandedId === id){
            setExpandedId(undefined);
        }
    }

    useEffect(() => {
        if(!enabled && expandedId !== undefined){
            setExpandedId(undefined);
        }
    }, [enabled]);

    return (
        <div id="side-nav" className={`${enabled?"enabled":"disabled"}`}>
            <div ref={ref} id="side-nav-bg">
                {Object.entries(Config.PRODUCT_NAV_OPTIONS.ENTRIES).map(([category, subCategories]) => (
                    <NavAccordion id={`accordion-${category}`} expandedId={expandedId} onChange={expandSection} category={category} subCategories={subCategories}/>
                ))}
                {Object.entries(Config.PRODUCT_NAV_OPTIONS.SINGLE_ENTRIES).map(([category, link]) => (
                    <NavLink category={category} link = {link} rootCategory={true}/>
                ))}
            </div>
        </div>
    );

});

export default SideNavBar;