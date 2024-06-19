//Imports
import { Box } from '@mui/material';
import { CustomInput, CustomSubmit } from '../Form/FormComponents';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { DataContext } from '../../pages/Core/DataContext';
import { CreateAccount } from '../../api/AccountResolver';
import { useNavigate } from 'react-router-dom';

//Styles
import './AccountCreate.css'

//Types
type VerificationReturnType = [boolean, string?]
type VerificationCallback = (input:string) => VerificationReturnType

//Component
export default function AccountCreate() {

    const dataModules = useContext(DataContext)!;
    const formRef = useRef<HTMLFormElement|null>(null);

    //Fields
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [errorMessages, setErrorMessages] = useState<Record<string, string|undefined>>({});
    const errorSet:(Record<string, boolean>)|undefined = {};
    const errorMessageSet:(Record<string, string|undefined>)|undefined = {};
    const navigate = useNavigate();

    //Verification callbacks
    const Verifications = new Map<string, VerificationCallback>([
        ['first', (input:string):VerificationReturnType => {
            if(input.length === 0){return [false];}
            return [true];
        }],
        ['last', (input:string):VerificationReturnType => {
            if(input.length === 0){return [false];}
            return [true];
        }],
        ['email', (input:string):VerificationReturnType => {
            const isValidEmail:boolean = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input); //Credits to ChatGPT for this formula
            return isValidEmail ? [true] : [false, "Invalid email address format"];
        }],
        ['password', (input:string):VerificationReturnType => {
            if(!formRef.current){return [false, "Internal error"];}
            const password2Input:string = new FormData(formRef.current).get("password2") as string;
            (Verifications.get('password2')!)(password2Input);
            if(input.length < 6){return [false, "Password must be at least 6 characters"];}
            return [true];
        }],
        ['password2', (input:string):VerificationReturnType => {
            if(!formRef.current){return [false, "Internal error"];}
            const passwordInput:string = new FormData(formRef.current).get("password") as string;
            if(input !== passwordInput){return [false, "Password does not match"];}
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

        //Verify all fields are correct
        const SubmittedData = new FormData(event.currentTarget);
        let success:boolean = true;
        SubmittedData.forEach((_, name) => {
            success = fieldVerify(name, SubmittedData.get(name) as string);
            if(!success){return;}
        })
        if(!success){return;}

        //Remove password verify field
        SubmittedData.delete("password2");

        //Request account create
        CreateAccount(SubmittedData, dataModules.session).then((authed:boolean) => {
            if(!authed){
                navigate("/login");
                return;
            }
        });

    }

    //Component
    return (
        <div id="content-container">
            <h1 id="account-create-title">Create an account</h1>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { width: '30ch' },
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
                    <CustomInput name="first" type="text" label="First Name" validate={fieldVerify} clearValidation={fieldClearValidation} error={errors["first"]} errorMessage={errorMessages["first"]}/>
                    <div style={{width:'1ch'}}></div>
                    <CustomInput name="last" type="text" label="Last Name" validate={fieldVerify} clearValidation={fieldClearValidation} error={errors["last"]} errorMessage={errorMessages["last"]}/>
                </div>
                <div className="form-section">
                    <CustomInput name="email" type="email" label="Email" sx={{width:"100% !important"}} validate={fieldVerify} clearValidation={fieldClearValidation} error={errors["email"]} errorMessage={errorMessages["email"]}/>
                </div>
                <div className="form-section">
                    <CustomInput name="password" type="password" label="Password" validate={fieldVerify} clearValidation={fieldClearValidation} error={errors["password"]} errorMessage={errorMessages["password"]}/>
                    <div style={{width:'1ch'}}></div>
                    <CustomInput name="password2" type="password" label="Confirm Password" validate={fieldVerify} clearValidation={fieldClearValidation} error={errors["password2"]} errorMessage={errorMessages["password2"]}/>
                </div>
                <div className="form-section">
                    <CustomSubmit>
                        REGISTER
                    </CustomSubmit>
                </div>
            </Box>
        </div>
    );

}