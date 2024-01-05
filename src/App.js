import logo from './logo.svg';
import './App.css';
import { Button, Paper, Card, CardContent, CardActions, Grid, Container, TextField, Typography} from '@mui/material';
import { useEffect, useState } from 'react';


function AddTorpe({ onAddTorpe }) {
  const [ujtorpe, setUjtorpe] = useState("");
  const [ujspeed, setUjspeed] = useState(0);
  return (
    <Grid item xs="12">
    <Paper style={{padding: 15}}>
      <TextField
      label="Név"
      type='text' value={ujtorpe}
        onChange={e => setUjtorpe(e.target.value)} />
      <TextField
      label="Sebesség"
      type='number' value={ujspeed}
        onChange={e => setUjspeed(e.target.value)} /><br/><br/>
      <Button variant={"contained"} color={"error"} onClick={() => {
        onAddTorpe(ujtorpe, parseInt(ujspeed, 10));
        setUjtorpe("");
      }}>add torpe ({ujtorpe.length})</Button>
    </Paper>
    </Grid>
  )
}


function Torpe({ torpe, onDelete, addKo, onKoChange }) {
  const [ko, setKo] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setKo(k => k + 1);
    },1000 * Math.max(torpe.speed),1);

    return () => {
      clearInterval(t);
    }
  }, [setKo,torpe.speed]);

  useEffect(() => {
      onKoChange(torpe.id,ko)
  },[ko])

  return <Grid item xs="6">
    <Card style={{ border: '1px solid black', padding: '5px', margin: '5px' }}>
    <CardContent>
    <Typography variant={"h5"}>{torpe.name}</Typography>
    <b>Speed: {torpe.speed}</b><br />
    <i>Ko: {ko}</i>
    </CardContent>
    <CardActions>
    <Button variant={"contained"} onClick={() => {
      onDelete(torpe.id);
    }}>torol
    </Button>
    </CardActions>
  </Card>
  </Grid>
}

function App() {

  const [torpek, setTorpek] = useState([
    { id: 1, name: 'Tudor', speed: 1, ko: 0 },
    { id: 2, name: 'Vidor', speed: 2, ko: 0  },
    { id: 3, name: 'Szundi', speed: 3, ko: 0  },
    { id: 4, name: 'Szende', speed: 4, ko: 0  },
    { id: 5, name: 'Hapci', speed: 5, ko: 0  },
    { id: 6, name: 'Kuka', speed: 6, ko: 0  }
  ]);

  const [ujtorpe, setUjtorpe] = useState("");

  let osszko = 0;
  for(let i=0;i<torpek.length;i++) {
    osszko += torpek[i].ko;
  }
  return (
    <Container maxWidth={"md"}>
      <h2>Ossz ko: {osszko} </h2>
      <Grid container spacing={2}>
      {torpek.map(e => {
        return <Torpe torpe={e} onDelete={id => {
          setTorpek(torpek.filter(f => f.id != id));
        }} onKoChange={(id,ko) => {
          setTorpek(torpek.map(f => {
            if(f.id !== id) {
              return f;
            }
            return {
              ...f,
              ko
            }
          }));
        }} />
      })}
       <AddTorpe onAddTorpe={(ujtorpename, ujspeed) => {
        setTorpek([...torpek, {
          id: `${Math.random()}`.substr(2),
          name: ujtorpename,
          speed: ujspeed,
          ko: 0
        }]);
      }} />
      </Grid>
    
</Container>
  );
}

export default App;
