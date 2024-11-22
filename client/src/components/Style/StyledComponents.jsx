import { styled } from "@mui/material";
import { Link as LinkComponent} from 'react-router-dom';

// we styled that input this is add image when click on avtar

const VisuallyHiddenInput = styled("input")({
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "normal",
  width: 1,
});

// Default export
export default VisuallyHiddenInput;

export const Link = styled(LinkComponent)`
  text-decoration: none;
  color: black;
  padding: 1rem;
  &:hover{
    background-color: #f0f0f0;
  }
`;

