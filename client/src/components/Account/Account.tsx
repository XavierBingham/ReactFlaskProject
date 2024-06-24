//Imports
import { useContext, useEffect } from 'react';
import { DataContext } from '../../pages/Core/DataContext';
import { useNavigate } from 'react-router-dom';

//Styles
import './Account.css'

//Component
export default function Account() {

    //Vars
    const dataModules = useContext(DataContext);
    const userSession = dataModules?.session.getSession();
    const navigate = useNavigate();

    //Methods
    useEffect(() => {
        if(!userSession){
            navigate("/login");
        }
    }, [])

    return (
        <>
            {userSession === undefined ? (<></>) :
            (<div>
                My Account - {userSession.displayName}
            </div>)}
        </>
    );

}