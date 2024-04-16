//Imports
import { useState } from 'react';
import { Tooltip, TooltipProps, tooltipClasses } from '@mui/material';
import styled from '@emotion/styled';

//Styles
import './ControlButton.css'

//Components
const CustomTooltip = styled((props:TooltipProps) => (
    <Tooltip
        placement="bottom"
        slotProps={{
            popper: {
                modifiers: [{
                    name: 'offset',
                    options: {
                        offset: [0, 8],
                    },
                }]
            }
        }}
        {...props}
    />
))(({theme}) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "white",
        color: "black",
    },
}));

//Component
function ControlButton({children, id, title, handleClick}:{children:any, id:string, title:string, handleClick?:(event:React.MouseEvent<HTMLButtonElement>)=>void}) {

    const [clicked, setClicked] = useState(false);

    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        if(handleClick){
            handleClick(event);
        }
        if(clicked){return;}
        setClicked(true);
        setTimeout(() => {
            setClicked(false);
        }, 250);
    }

    return (
        <CustomTooltip title={`${title}`}>
            <button id={id} className={`control-button ${clicked ? 'animate' : ''}`} onClick={onClick}>
                {children}
            </button>
        </CustomTooltip>
    )

}

export default ControlButton;