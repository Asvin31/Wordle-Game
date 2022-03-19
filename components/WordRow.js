import { Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { WordContext } from '../context/WordContext';

const WORD_LENGTH = 5;
function WordRow({ word = '', index }) {
    const remainingLetters = WORD_LENGTH - word.length;
    const words = [...word].concat(Array(remainingLetters).fill(''));
    const { correctLetters, wrongLetters, incorrectLocation } = useContext(WordContext);
    const getBackGroundColorForValue = (value) => {
        if (correctLetters.includes(value)) return "green"
        else if (wrongLetters.includes(value)) return "yellow"
        else if (incorrectLocation.includes(value)) return "grey"
    }
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={0.5}
            sx={{ marginBottom: '1%' }}
            className={`${index}`}
        >
            {words.map(value => (
                <Grid item md={2} sm={2} xs={2}>
                    <Typography
                        align="center"
                        sx={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            border: '0.15em solid #9d9d9f',
                            fontSize: '2em',
                            color: 'white',
                            userSelect: 'none',
                            minHeight: '85%',
                            height: '7vh',
                            margin: '0.5%',
                            backgroundColor: getBackGroundColorForValue(value)
                        }}
                        key={value}
                    >
                        {value}
                    </Typography>
                </Grid>
            ))}
        </Grid>
    )
};

export default WordRow;
