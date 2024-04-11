//Imports
import { Accordion, AccordionProps, AccordionSummary, AccordionDetails, AccordionActions, styled } from '@mui/material';

//Styles
import './NavAccordion.css';

//Components
const CustomAccordion = styled((props:AccordionProps) => (
    <Accordion 
        disableGutters
        square
        slotProps={{
            transition:{unmountOnExit: true},
        }}
        {...props}
    />
))(({theme}) => ({
    border: 'none',
    borderBottom: 'none',
}));

//Component
function NavAccordion() {

    return (
        <CustomAccordion>
            <AccordionSummary id="test1" aria-controls="panel-content">
                Test2
            </AccordionSummary>
            <AccordionDetails>
                Some details1
            </AccordionDetails>
        </CustomAccordion>
    );

}

export default NavAccordion;