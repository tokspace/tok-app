import styled from "styled-components";

// https://github.com/electron/electron/blob/master/docs/api/frameless-window.md#draggable-region
export const InvisibleTitleBar = styled.div`
    -webkit-app-region: drag;
    z-index: 42;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3em;
    background: rgba(0, 0, 0, 0);
`;
