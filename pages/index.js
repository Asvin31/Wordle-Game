import { Container, Divider, Grid, Typography } from "@mui/material"
import { useState } from "react"
import KeyBoard from "../components/Keyboard"
import WordRow from "../components/WordRow"

export default function Home() {
  const [word, setWord] = useState({
    "-1": []
  })
  const [index, setIndex] = useState(0);
  const [stopTyping, setStopTyping] = useState(false);
  console.log("word ->->->->", word);
  const keyPress = (e, letter) => {
    if ((letter != "back" || letter != "ENTER") && !stopTyping) {
      let existingLetters = word[index];
      console.info("existingletters -----", existingLetters);
      if (existingLetters == undefined) {
        existingLetters = [];
      }
      if (existingLetters.length >= 5) {
        let temp = index + 1;
        setStopTyping(true);
        setIndex(temp);
        guessWord();
        return;
      };
      existingLetters.push(letter)
      console.info("after push -----", existingLetters);
      setWord({ ...word, [index]: existingLetters })
    }
  }
  const guessWord = () => {
    console.info("result ---", word[index]?.join("").toUpperCase() === "QWERT");
  }
  return (
    <Grid item sm={12} xs={12} md={12} lg={12} sx={{ backgroundColor: "#383737", height: '100vh', margin: 'auto' }}>
      <Container sx={{ padding: '2%' }}>
        <Typography
          variant="h3"
          align="center"
        >Wordle</Typography>
        <Divider />
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
          <Grid item sm={12} xs={12} md={12} lg={6} sx={{ margin: '1% 0' }}>
            <WordRow word={word[0]} />
            <WordRow word={word[1]} />
            <WordRow word={word[2]} />
            <WordRow word={word[3]} />
            <WordRow word={word[4]} />
            <WordRow word={word[5]} />
          </Grid>
          <Grid item sm={12} xs={12} md={8}>
            <KeyBoard keyPress={keyPress} />
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}
