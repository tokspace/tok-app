import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

const ErrMsg = styled.p`
    display: block;
    font-weight: 700;
    font-size: 0.8em;
    color: #ff3333;
    opacity: 0;
    height: 1em;
    margin: 1em;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    ${(props) =>
        props.active &&
        css`
            opacity: 1;
        `};
`;

const ErrorMessage = ({ message, timeout, setMessage }) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        let mounted = true;
        setActive(true);
        setTimeout(() => {
            if (mounted) {
                setActive(false);
                setTimeout(() => setMessage(""), 300);
            }
        }, timeout);

        return () => (mounted = false);
    }, [message, timeout, setMessage]);

    return <ErrMsg active={active}>{message}</ErrMsg>;
};

export default ErrorMessage;
