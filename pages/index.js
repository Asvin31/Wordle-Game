import { Container, Typography, Divider, Grid } from "@mui/material"
import { grey } from "@mui/material/colors"
import KeyBoard from "../components/Keyboard"
import WordRow from "../components/WordRow"

export default function Home() {
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
            <WordRow />
            <WordRow />
            <WordRow />
            <WordRow />
            <WordRow />
            <WordRow />
          </Grid>
          <Grid item sm={12} xs={12} md={8}>
            <KeyBoard />
          </Grid>
        </Grid>
      </Container>
    </Grid>
  )
}
