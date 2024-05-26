//Styles
import { Box } from '@mui/material';
import { CustomInput } from '../Form/FormComponents';
import './AccountCreate.css'
import React, { useRef } from 'react';

//Types
type VerificationReturnType = [boolean, string?]
type VerificationCallback = (input:string) => VerificationReturnType

//Component
export default function AccountCreate() {

    const FormRef = useRef<HTMLFormElement|null>(null);

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
            if(!FormRef.current){return [false, "Internal error"];}
            const password2Input:string = new FormData(FormRef.current).get("password2") as string;
            (Verifications.get('password2')!)(password2Input);
            if(input.length < 6){return [false, "Password must be at least 6 characters"];}
            return [true];
        }],
        ['password2', (input:string):VerificationReturnType => {
            if(!FormRef.current){return [false, "Internal error"];}
            const passwordInput:string = new FormData(FormRef.current).get("password") as string;
            if(input !== passwordInput){return [false, "Password does not match"];}
            return [true];
        }],
    ]);

    //Methods
    const FormVerify = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const SubmittedData = new FormData(event.currentTarget);
        
    }

    //Component
    return (
        <div id="content-container">
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { width: '30ch' },
                    '& .form-section': {display: 'flex', justifyContent: 'space-between', width: '100%'},
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                }}
                autoComplete="off"
                onSubmit={FormVerify}
                ref={FormRef}
            >
                <div className="form-section">
                    <CustomInput name="first" type="text" label="First Name" onChangeValidation={Verifications.get("first") as VerificationCallback}/>
                    <div style={{width:'1rem'}}></div>
                    <CustomInput name="last" type="text" label="Last Name" onChangeValidation={Verifications.get("last") as VerificationCallback}/>
                </div>
                <div className="form-section">
                    <CustomInput name="email" type="email" label="Email" sx={{width:"100% !important"}} onChangeValidation={Verifications.get("email") as VerificationCallback}/>
                </div>
                <div className="form-section">
                    <CustomInput name="password" type="password" label="Password" onChangeValidation={Verifications.get("password") as VerificationCallback}/>
                    <div style={{width:'1rem'}}></div>
                    <CustomInput name="password2" type="password" label="Confirm Password" onChangeValidation={Verifications.get("password2") as VerificationCallback}/>
                </div>
                <div className="form-section">
                    <CustomInput name="submit" type="submit" value="SIGN UP"/>
                </div>
            </Box>
        </div>
    );

}