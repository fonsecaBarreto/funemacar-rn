import * as React from 'react';
import {TextInput } from "./styles"
export const TextInputControl: React.FunctionComponent<any> = ({ ...props }) => {
    return ( <TextInput { ...props} ></TextInput> )
}
export default TextInputControl