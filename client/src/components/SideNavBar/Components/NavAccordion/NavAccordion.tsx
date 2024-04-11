//Imports
import { Accordion, AccordionSummary, AccordionDetails, AccordionActions } from '@mui/material';

//Styles
import './NavAccordion.css';

//Component
function NavAccordion() {

    return (
        <Accordion slotProps={{
            transition: {unmountOnExit: true},
        }}>
            <AccordionSummary id="test1" aria-controls="panel-content">
                Test2
            </AccordionSummary>
            <AccordionDetails>
                Some details1
            </AccordionDetails>
        </Accordion>
    );

}

export default NavAccordion;