//Imports
import { Accordion, AccordionProps, AccordionSummary, AccordionDetails, AccordionActions, styled, AccordionSummaryProps, AccordionDetailsProps } from '@mui/material';
import Typography from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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
    boxShadow: 'none',
}));

const CustomSummary = styled((props:AccordionSummaryProps) => (
    <AccordionSummary
        expandIcon={<ChevronRightIcon/>}
        {...props}
    />
))(({theme}) => ({
    '& .MuiAccordionSummary-content': {
        color: 'var(--main-color)',
        fontWeight: 'bold',
    },
    '& .MuiAccordionSummary-expandIconWrapper': {
        transform: 'scale(1.2)',
    },
    '& .MuiAccordionSummary-expandIconWrapper svg path': {
        color: 'var(--main-color)',
    },
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg) scale(1.2)',
    },
}));

const CustomDetails = styled((props:AccordionDetailsProps) => (
    <AccordionDetails
        {...props}
    />
))(({theme}) => ({
    color: 'var(--main-color)',
}));

//Component
function NavAccordion({id, expandedId, onChange}:{id:string, expandedId:string|undefined, onChange:(id:string)=>any}) {

    return (
        <CustomAccordion expanded={id === expandedId} onChange={onChange(id)}>
            <CustomSummary id={id} aria-controls="panel-content">
                Category Title
            </CustomSummary>
            <CustomDetails>
                Sub Category
            </CustomDetails>
            <CustomDetails>
                Sub Category
            </CustomDetails>
            <CustomDetails>
                Sub Category
            </CustomDetails>
            <CustomDetails>
                Sub Category
            </CustomDetails>
        </CustomAccordion>
    );

}

export default NavAccordion;