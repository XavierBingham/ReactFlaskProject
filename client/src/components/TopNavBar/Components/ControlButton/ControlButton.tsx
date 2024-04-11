//Styles
import { useState } from 'react';
import './ControlButton.css'

//Component
function ControlButton({children, id, handleClick}:{children:any, id:string, handleClick?:(event:React.MouseEvent<HTMLButtonElement>)=>void}) {

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
        <button id={id} className={`control-button ${clicked ? 'animate' : ''}`} onClick={onClick}>
            {children}
        </button>
    )

}

export default ControlButton;