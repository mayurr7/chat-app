import { styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";
import { greayColor } from "../../Constants/color";

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
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const InputBox = styled("input")`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 3rem;
  border-radius: 1.5rem;
  background-color: ${greayColor};
`;

export const SearchField = styled("input")`
  padding: 1rem 2rem;
  width: 20vmax;
  border: none;
  outline: none;
  border-radius: 1.5rem;
  background-color:rgb(227, 218, 218);
  font-size: 1.1rem;
`;

export const CurveButton = styled("button")`
  padding: 1rem 2rem;
  width: 15vmax;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 1.5rem;
  background-color: black;
  color: white;
  font-size: 1.1rem;
  &:hover {
  background-color: rgba(0,0,0,0.8);
  };
`;

