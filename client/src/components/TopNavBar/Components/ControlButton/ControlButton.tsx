//Imports
import { ForwardedRef, forwardRef, useState } from 'react';
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
        color: "var(--main-color-lighter)",
        boxShadow: "0px 1px 2px var(--main-color)",
        fontWeight: "bold",
    },
}));

//Component
const ControlButton = forwardRef((props:{children:any, id:string, title:string, handleClick?:(event:React.MouseEvent<HTMLButtonElement>)=>void}, ref:ForwardedRef<HTMLButtonElement>) => {

    //State
    const [clicked, setClicked] = useState(false);

    //Methods
    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        if(props.handleClick){
            props.handleClick(event);
        }
        if(clicked){return;}
        setClicked(true);
        setTimeout(() => {
            setClicked(false);
        }, 250);
    }

    //Component
    return (
        <CustomTooltip title={`${props.title}`}>
            <button ref={ref} id={props.id} className={`control-button ${clicked ? 'animate' : ''}`} onClick={onClick}>
                {props.children}
            </button>
        </CustomTooltip>
    )

});

export default ControlButton;