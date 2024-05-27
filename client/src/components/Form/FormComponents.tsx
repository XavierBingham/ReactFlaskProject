//Imports
import { styled, InputProps, InputBase, InputBaseProps, TextField, TextFieldProps, ButtonProps } from "@mui/material"
import { FormEventHandler, FormHTMLAttributes, InputHTMLAttributes, useState } from "react"

//Styles
import "./FormComponents.css"

//Input Component
interface CustomProps {
    errorMessage?:string,
    validate?:(name:string, input:string)=>void,
    clearValidation?:(name:string)=>void,
}

type CustomTextFieldProps = CustomProps & TextFieldProps;

const StyledCustomInput = styled((props:CustomTextFieldProps) => {

    const revalidate = (event: React.FocusEvent<HTMLInputElement>) => {
        if(!props.validate){return;}
        const input:string = event.target.value;
        props.validate(props.name!, input);
    };

    const changeRevalidate = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(!props.clearValidation){return;}
        props.clearValidation(props.name!);
    };
    
    const propType:string = props.type || "text";
    return (
        <TextField
            {...props}
            variant={props.variant || "filled"}
            helperText={props.error ? (props.errorMessage || "This field is required") : " "}
            onBlur={revalidate}
            onChange={changeRevalidate}
            sx={{
                '& :hover': {},
                '& .MuiFormHelperText-root': {
                    height: '1.5em',
                },
            }}
        />
    )
})(({theme}) => ({
    '& .MuiInputBase-root': {
        backgroundColor: 'transparent !important',
        height: '50px',
        color: 'black',
    },
}));

export const CustomInput = (props:CustomTextFieldProps) => {
    return (
        <StyledCustomInput {...props}/>
    );
}

interface CustomSubmitProps extends ButtonProps {

}

export const CustomSubmit = (props:CustomSubmitProps) => {
    return (
        <button
            className="custom-submit"
            type="submit"
            name="submit"
            {...props}
        >
            {props.children}
        </button>
    );
}