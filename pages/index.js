import CloseIcon from '@mui/icons-material/Close';
import { Container, Divider, Grid, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import { useContext, useEffect, useMemo, useState } from "react";
import KeyBoard from "../components/Keyboard";
import WordRow from "../components/WordRow";
import { WordContext } from "../context/WordContext";
import targetWords from "../words.json";

export default function Home() {

  const offsetFromDate = new Date(2022, 2, 19)
  const msOffset = Math.abs(new Date().getTime() - offsetFromDate.getTime());
  const diffDays = Math.ceil(msOffset / (1000 * 60 * 60 * 24));
  const targetWord = targetWords[diffDays];
  const wordLength = 5;
  const [word, setWord] = useState({
    "-1": []
  })
  const [index, setIndex] = useState(0);
  const [stopTyping, setStopTyping] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");
  const { setCorrectLetters, setWrongLetters, setIncorrectLocation } = useContext(WordContext);

  const handleAlertClose = (event) => {
    setMessage("");
    setOpenAlert(false);
  }

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
  });

  const getExistingLetters = useMemo(() => {
    removeTiles(index);
    let existingLetters = word[index];
    if (existingLetters == undefined) {
      existingLetters = [];
    }
    return existingLetters
  }, [word, index])



  const addLetters = (e, letter) => {
    let letters = getExistingLetters;
    if (letter != "back" && letter != "ENTER" && !stopTyping) {
      if (letters.length >= wordLength) {
        setStopTyping(true);
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
    if (word[index]?.length != wordLength) {
      setMessage("Not Enough Letters")
      setOpenAlert(true);
      shakeTiles(index);
      return;
    }
    let temp = index + 1;
    let correct = [], wrong = [], incorrect = [];
    const wordArray = word[index];
    for (var i = 0; i < wordArray.length; i++) {
      if (targetWord[i] === wordArray[i]) {
        correct.push(wordArray[i]);
        console.log("correct words", wordArray[i]);
      }
      else if (targetWord.includes(wordArray[i])) {
        wrong.push(wordArray[i]);
        console.log("wrong location words", wordArray[i]);
      }
      else {
        incorrect.push(wordArray[i]);
        console.log("wrong words", wordArray[i]);
      }
    }
    setCorrectLetters(correct);
    setWrongLetters(wrong);
    setIncorrectLocation(incorrect);
    setIndex(temp);
    setStopTyping(false);
  }

  function shakeTiles(index) {
    const queryGrid = document?.getElementsByClassName(index);
    let letterElements = queryGrid[0].children;
    [...letterElements].forEach((element) => {
      let boxElement = element.getElementsByClassName("MuiTypography-root");
      console.log(boxElement)
      boxElement[0].classList.add("shake");
    })
  }

  function removeTiles(index) {
    if (process.browser) {
      let shakeTiles = document.getElementsByClassName("shake");
      [...shakeTiles].forEach((element) => {
        console.log(element);
        element.classList.remove("shake");
      })
    }
  }

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleAlertClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

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
            <WordRow word={word[0]} index={0} />
            <WordRow word={word[1]} index={1} />
            <WordRow word={word[2]} index={2} />
            <WordRow word={word[3]} index={3} />
            <WordRow word={word[4]} index={4} />
            <WordRow word={word[5]} index={5} />
          </Grid>
          <Grid item sm={12} xs={12} md={8}>
            <KeyBoard addLetters={addLetters} />
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={openAlert}
          autoHideDuration={3000}
          onClose={handleAlertClose}
          message={message}
          action={action}
        />
      </Container>
    </Grid>
  )
}
