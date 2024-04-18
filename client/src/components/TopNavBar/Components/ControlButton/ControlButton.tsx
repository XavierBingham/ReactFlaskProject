//Imports
import { useState } from 'react';
import { Tooltip, TooltipProps, tooltipClasses, styled } from '@mui/material';

//Styles
import './ControlButton.css'

//Components
const CustomTooltip = styled(({className, ...props}: TooltipProps) => (
    <Tooltip
        classes={{popper:className}}
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
        color: "var(--main-color)",
        boxShadow: "0px 1px 2px var(--main-color)",
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