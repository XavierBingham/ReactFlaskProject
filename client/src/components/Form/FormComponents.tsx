//Imports
import { styled, InputProps, InputBase, InputBaseProps, TextField, TextFieldProps } from "@mui/material"
import { FormEventHandler, FormHTMLAttributes, InputHTMLAttributes, useState } from "react"

//Input Component
interface CustomProps {
    errorMessage?:string,
    onChangeValidation?:(input:string)=>[boolean, string?],
    onSubmit?:any,
}

type CustomTextFieldProps = CustomProps & TextFieldProps;

const StyledCustomInput = styled((props:CustomTextFieldProps) => {
    
    const [error, setError] = useState<boolean>(props.error || false);
    const [errorMessage, setErrorMessage] = useState<string>(props.errorMessage || "This field is required");

    const blurRevalidate = (event: React.FocusEvent<HTMLInputElement>) => {
        if(!props.onChangeValidation){return;}
        const input:string = event.target.value;
        const [success,message] = props.onChangeValidation(input);
        if(success){
            setError(false);
        }else{
            setErrorMessage(message || "This field is required");
            setError(true);
        }
    };

    const changeRevalidate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(false);
    };
    console.log(props.type);
    const propType:string = props.type || "text";
    return (
        <>
            {propType !== "submit" ?
                (<TextField
                    {...props}
                    variant={props.variant || "filled"}
                    helperText={error ? errorMessage : ""}
                    onBlur={blurRevalidate}
                    onChange={changeRevalidate}
                    error={error}
                    sx={{
                        '& :hover': {}
                    }}
                />) : 
                (<TextField
                    {...props}
                    variant={props.variant || "filled"}
                    onSubmit={props.onSubmit!}
                    sx={{
                        margin:"auto",
                        width:"100% !important",
                        backgroundColor:"var(--main-color)",
                        textAlign:"center",
                        marginTop:"20px",
                        '& .MuiInputBase-root': {
                            display:"flex !important",
                            justifyContent:"center !important",
                            alignItems:"center !important",
                        },
                        '& input': {
                            color:"white",
                            padding:"0",
                            fontSize:"medium",
                            fontWeight:"bold",
                        },
                        '& :hover': {
                            cursor:"pointer",
                        },
                    }}
                />)
            }
        </>
    )
})(({theme}) => ({
    '& .MuiInputBase-root': {
        backgroundColor: 'transparent',
        height: '50px',
    },
}));

export const CustomInput = (props:CustomTextFieldProps) => {
    return (
        <StyledCustomInput {...props}/>
    );
}