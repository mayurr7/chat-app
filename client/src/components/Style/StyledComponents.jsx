import { styled } from "@mui/material";

const VisuallyHiddenInput = styled('input')({
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    whiteSpace: 'normal',
    width: 1,
});

// Default export
export default VisuallyHiddenInput;
