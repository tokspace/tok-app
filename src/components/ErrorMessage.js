import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

const ErrMsg = styled.p`
    display: inline;
    font-weight: 700;
    color: #ff3333;
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    ${(props) =>
        props.active &&
        css`
            opacity: 1;
        `};
`;

const ErrorMessage = (props) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(true);
        setTimeout(() => {
            setActive(false);
        }, 3000);
    }, [props.msg]);

    return <ErrMsg active={active}> {props.msg} </ErrMsg>;
};

export default ErrorMessage;
