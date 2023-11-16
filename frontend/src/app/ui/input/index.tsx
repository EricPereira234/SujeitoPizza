import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}


export default function Input({...res}: InputProps){
    return(
        <input  className={styles.input} {...res}/>
    )
}


export  function TextArea({...res}: TextAreaProps){
    return(
        <textarea className={styles.input} {...res} ></textarea>
    )
}