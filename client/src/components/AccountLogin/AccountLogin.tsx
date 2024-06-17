//Imports
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { CustomFormControl, CustomInput, CustomSubmit } from '../Form/FormComponents';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { DataContext } from '../../pages/Core/DataContext';

//Styles
import './AccountLogin.css'
import { Login } from '../../api/AccountResolver';

//Types
type VerificationReturnType = [boolean, string?]
type VerificationCallback = (input:string) => VerificationReturnType

//Component
export default function AccountLogin() {

    const dataModules = useContext(DataContext);
    const formRef = useRef<HTMLFormElement|null>(null);

    //Field states
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [errorMessages, setErrorMessages] = useState<Record<string, string|undefined>>({});
    const errorSet:(Record<string, boolean>)|undefined = {};
    const errorMessageSet:(Record<string, string|undefined>)|undefined = {};

    //Verification callbacks
    const Verifications = new Map<string, VerificationCallback>([
        ['email', (input:string):VerificationReturnType => {
            const isValidEmail:boolean = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input); //Credits to ChatGPT for this formula
            return isValidEmail ? [true] : [false, "Invalid email address format"];
        }],
        ['password', (input:string):VerificationReturnType => {
            if(input.length === 0){return [false];}
            return [true];
        }],
    ]);

    //State initialization
    useEffect(() => {
        Verifications.forEach((_,name) => {
            errorSet![name as string] = false;
            errorMessageSet![name as string] = undefined;
        })
        setErrors(errorSet!);
        setErrorMessages(errorMessageSet!);
    }, [])

    //Methods
    const fieldClearValidation = (name:string):void => {
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: false
        }));
        setErrorMessages(prevErrorMessages => ({
            ...prevErrorMessages,
            [name]: undefined
        }));
    }

    const fieldVerify = (name:string, input:string):boolean => {
        const verifyMethod = Verifications.get(name);
        if(!verifyMethod){return false;}
        const [success, message]:[boolean, string?] = verifyMethod(input);
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: !success
        }));
        setErrorMessages(prevErrorMessages => ({
            ...prevErrorMessages,
            [name]: message
        }));
        return success;
    }

    const formVerify = (event:any):void => {

        event.preventDefault();
        const SubmittedData = new FormData(event.currentTarget);
        let success:boolean = true;
        SubmittedData.forEach((_, name) => {
            success = fieldVerify(name, SubmittedData.get(name) as string);
            if(!success){return;}
        })
        if(!success){return;}

        //Request account login
        Login(SubmittedData).then((res) => {
              
        });

    }

    //Component
    return (
        <div id="content-container">
            <h1 id="account-create-title">Login to account</h1>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { width: '61ch' },
                    '& .form-section': {display: 'flex', justifyContent: 'space-between', width: '100%'},
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                autoComplete="off"
                ref={formRef}
                onSubmit={formVerify}
            >
                <div className="form-section">
                    <CustomInput name="email" type="email" label="Email" sx={{width:"100% !important"}} validate={fieldVerify} clearValidation={fieldClearValidation} error={errors["email"]} errorMessage={errorMessages["email"]}/>
                </div>
                <div className="form-section">
                    <CustomInput name="password" type="password" label="Password" validate={fieldVerify} clearValidation={fieldClearValidation} error={errors["password"]} errorMessage={errorMessages["password"]}/>
                </div>
                <div className="form-section">
                    <CustomSubmit>
                        SIGN IN
                    </CustomSubmit>
                </div>
            </Box>
        </div>
    );

}