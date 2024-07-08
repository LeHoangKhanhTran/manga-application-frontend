import { ChangeEvent } from "react";
import { InputField } from "./Input.style"

interface InputProps {
    label: string;
    inputType: string;
    labelText: string;
    isRequired: boolean;
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function Input({label, inputType, labelText, isRequired, value, onChange} : InputProps) {
    return (
        <InputField>
            <label htmlFor={label}>{labelText[0].toUpperCase() + labelText.substring(1, labelText.length)}{'\u00A0'}{isRequired && <span className="require-sign">*</span>}</label>
            <input type={inputType} name={label} value={value} onChange={onChange}/>
        </InputField>
    )
}