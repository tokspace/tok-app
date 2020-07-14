import React from "react";
import styled from "styled-components";
import FloatingLabel from "../components/FloatingLabel";

export const RelPositioning = styled.div`
    position: relative;
`;

export const Input = styled.input`
    width: calc(100% - 1.6em);
    font-family: "Roboto Mono", monospace;
    font-size: 0.8em;
    padding: calc(0.8em - 1px);
    outline: none;
    margin-top: 2em;
`;

export const Button = styled.button`
    width: 100%;
    font-weight: 900;
    padding: calc(0.8em - 1px);
    margin-top: 2em;
    font-family: "Roboto Mono", monospace;
`;

export const TextInput = (props) => {
    return (
        <RelPositioning>
            <FloatingLabel
                label={props.label}
                id={props.id}
                value={props.value}
            />
            <Input
                name={props.id}
                className="lt-shadow"
                placeholder={props.label}
                id={props.id}
                type={props.type}
                autoFocus
                autoComplete="off"
                onChange={props.onChange}
                value={props.value}
            />
        </RelPositioning>
    );
};
