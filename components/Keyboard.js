import BackspaceIcon from '@mui/icons-material/Backspace';
import { Grid } from "@mui/material";
import StyledButton from './StyledButton';

const KeyBoard = ({ addLetters }) => {
    const FirstRowLetters = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
    const SecondRowLetters = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    const ThirdRowLetters = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'back']
    return (
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={0.5}>
            <Grid item sx={{ display: 'flex', justifyContent: "center", alignItems: "center", gap: 1 }}>
                {FirstRowLetters.map((letter, index) => (
                    <StyledButton
                        colorProp={"normal"}
                        size="small"
                        variant="contained"
                        key={letter}
                        onClick={(e) => addLetters(e, letter)}
                    >
                        {letter}
                    </StyledButton>

                ))}
            </Grid>
            <Grid item sx={{ display: 'flex', justifyContent: "center", alignItems: "center", gap: 1 }}>
                {SecondRowLetters.map((letter, index) => (

                    <StyledButton
                        colorProp={"normal"}
                        size="small"
                        variant="contained"
                        key={letter}
                        onClick={(e) => addLetters(e, letter)}
                    >
                        {letter}
                    </StyledButton>

                ))}
            </Grid>
            <Grid item sx={{ display: 'flex', justifyContent: "center", alignItems: "center", gap: 1 }}>
                {ThirdRowLetters.map((letter, index) => (
                    <>
                        {letter != "back" ?
                            <StyledButton
                                colorProp={"normal"}
                                size={"small"}
                                variant="contained"
                                key={letter}
                                onClick={(e) => addLetters(e, letter)}
                            >
                                {letter}
                            </StyledButton>
                            :
                            <StyledButton
                                key={letter}
                                colorProp={"normal"}
                                size="small"
                                onClick={(e) => addLetters(e, letter)}
                                variant="contained">
                                <BackspaceIcon />
                            </StyledButton>
                        }

                    </>
                ))}
            </Grid>
        </Grid>
    )
}
export default KeyBoard