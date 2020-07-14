import React from "react";
import styled, { css } from "styled-components";

const StyledLabel = styled.label`
    position: absolute;
    top: 1.5em;
    font-weight: 300;
    font-size: 0.8em;
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
    ${(props) =>
        props.value.length > 0 &&
        css`
            top: 0.4em;
            opacity: 1;
        `};
`;

const FloatingLabel = (props) => {
    return (
        <StyledLabel
            label={props.label}
            value={props.value}
            className={props.id}
            htmlFor={props.id}>
            {props.label}
        </StyledLabel>
    );
};

export default FloatingLabel;
