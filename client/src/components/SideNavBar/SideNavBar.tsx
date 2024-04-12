//Imports
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { forwardRef, ForwardedRef, useRef, useState, useEffect } from 'react';

//Components
import NavAccordion from './Components/NavAccordion/NavAccordion';

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
                <NavAccordion id="test1" expandedId={expandedId} onChange={expandSection}/>
                <NavAccordion id="test2" expandedId={expandedId} onChange={expandSection}/>
                <NavAccordion id="test3" expandedId={expandedId} onChange={expandSection}/>
            </div>
        </div>
    );

});

export default SideNavBar;