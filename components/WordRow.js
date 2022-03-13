import { Grid, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import * as React from 'react';

const WORD_LENGTH = 5;

const WordBox = ({ value }) => {
    return (
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
                margin: '0.5%'
            }}
            key={value}
        >
            {value}
        </Typography>
    )
}

function WordRow({ word = '' }) {
    const remainingLetters = WORD_LENGTH - word.length;
    const words = word.split('').concat(Array(remainingLetters).fill(''));
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={0.5}
            sx={{ marginBottom: '1%' }}
        >
            {words.map(char => (
                <Grid item md={2} sm={2} xs={2}>
                    <WordBox value={char} key={char} />
                </Grid>
            ))}
        </Grid>
    )
};

export default WordRow;
