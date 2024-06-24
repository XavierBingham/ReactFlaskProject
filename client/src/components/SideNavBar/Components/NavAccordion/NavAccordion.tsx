//Imports
import { Accordion, AccordionProps, AccordionSummary, AccordionDetails, AccordionActions, styled, AccordionSummaryProps, AccordionDetailsProps } from '@mui/material';
import Typography from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useContext } from 'react';
import { DataContext } from '../../../../pages/Core/DataContext';
import { Link } from 'react-router-dom';

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

interface CustomDetailProps extends AccordionDetailsProps {
    rootCategory: boolean,
}

const CustomDetails = styled((props:CustomDetailProps) => (
    <AccordionDetails
        {...props}
    />
))(({theme, rootCategory}) => ({
    color: 'var(--main-color)',
    fontWeight: rootCategory ? 'bold' : 'normal',
}));

//Component
interface NavLinkProps {
    category:string,
    link:string,
    rootCategory?:boolean
    onLinkClick?:()=>void
}

export function NavLink({category, link, rootCategory=false, onLinkClick}:NavLinkProps) {

    return (
        <Link to={link} onClick={onLinkClick}>
            <CustomDetails rootCategory={rootCategory}>
                {category}
            </CustomDetails>
        </Link>
    )

}

interface NavAccordionProps {
    id:string,
    expandedId:string|undefined,
    onChange:(id:string)=>any,
    category:string,
    subCategories:{[subCategory:string]:string},
    onLinkClick?:()=>void,
}

export function NavAccordion({id, expandedId, onChange, category, subCategories, onLinkClick}:NavAccordionProps) {

    return (
        <CustomAccordion expanded={id === expandedId} onChange={onChange(id)}>
            <CustomSummary id={id} aria-controls="panel-content">
                {category}
            </CustomSummary>
            {Object.entries(subCategories).map(([subCategory,redirect]) => (
                <NavLink
                    key={subCategory}
                    category={subCategory}
                    link={redirect}
                    onLinkClick={onLinkClick}
                />
            ))}
        </CustomAccordion>
    );

}