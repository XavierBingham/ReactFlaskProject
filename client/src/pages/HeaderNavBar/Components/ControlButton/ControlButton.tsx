//Styles
import { useState } from 'react';
import './ControlButton.css'

//Component
function ControlButton({children, id}:{children:any, id:string}) {

    const [clicked, setClicked] = useState(false);

    const onClick = () => {
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