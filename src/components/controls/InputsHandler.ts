import React, { useState } from 'react'

const InputsHandler = (INITIAL_STATE: any) =>{
    const [data, setData ] = useState(INITIAL_STATE);
    const handleInputs = (struct: any) =>{
        setData((prev: any)=>({
            ...prev,
            ...struct
        }))
    }
    return ({data, handleInputs })
}
export default InputsHandler