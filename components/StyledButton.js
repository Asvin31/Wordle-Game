import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { green, grey, purple, yellow } from "@mui/material/colors";

const colors = {
    "normal": grey[700],
    "sucess": green[600],
    "misplaced": '#c9b458'
}

const hoverColors = {
    "normal": grey[800],
    "sucess": green[700],
    "misplaced": '#c9b560'
}
const StyledButton = styled(Button)(({ theme, colorProp = "normal" }) => ({
    backgroundColor: colors[colorProp],
    '&:hover': {
        backgroundColor: hoverColors[colorProp],
    },
}));

export default StyledButton