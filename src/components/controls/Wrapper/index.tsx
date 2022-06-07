import * as React from 'react';
import {Container, Label } from "./styles"

export const ControlWrapper: React.FunctionComponent<any> = ({ label, children }) => {
    return (
        <Container>
            <Label> { label }</Label>
            { children }
        </Container>
    )
}
export default ControlWrapper