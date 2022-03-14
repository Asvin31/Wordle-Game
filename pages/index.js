import { Container, Divider, Grid, Typography } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import KeyBoard from "../components/Keyboard"
import WordRow from "../components/WordRow"

export default function Home() {
  const [word, setWord] = useState({
    "-1": []
  })
  const [index, setIndex] = useState(0);
  const [stopTyping, setStopTyping] = useState(false);

  useEffect(() => {
    const keyPress = (e) => {
      let letters = getExistingLetters;
      if (e?.key === "Enter") {
        guessWord();
        return;
      }
      if (e?.key === "Backspace" || e?.key === "Delete") {
        letters = letters.slice(0, -1);
        setWord({ ...word, [index]: letters })
        return;
      }

      if (e?.key.match(/^[a-z]$/)) {
        addLetters(e, e.key);
        return;
      }

    }
    window.addEventListener("keydown", keyPress);
    return () => {
      window.removeEventListener('keydown', keyPress);
    };
  }, []);

  const getExistingLetters = useMemo(() => {
    let existingLetters = word[index];
    if (existingLetters == undefined) {
      existingLetters = [];
    }
    return existingLetters
  }, [word, index])



  const addLetters = (e, letter) => {
    let letters = getExistingLetters;
    if (letter != "back" && letter != "ENTER" && !stopTyping) {
      if (letters.length >= 5) {
        return;
      };
      letters.push(letter)
      setWord({ ...word, [index]: letters })
    }
    if (letter == "ENTER") {
      guessWord();
    }
    if (letter == "back") {
      letters = letters.slice(0, -1);
      setWord({ ...word, [index]: letters })
    }
  }
  const guessWord = () => {
    let temp = index + 1;
    // setStopTyping(true);
    console.info("result ---", word[index]?.join("").toUpperCase() === "QWERT");
    setIndex(temp);
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
            <KeyBoard addLetters={addLetters} />
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}
