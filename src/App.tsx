import { Container, Grid } from '@mui/material';

import { useState } from 'react';
import './App.css';
import LeftSidePanel from './components/LeftSidePanel';
import AppRouter from './router';

function App() {
  const [count, setCount] = useState(0);
  console.log(`import.meta.env`, import.meta.env);

  return (
    <Container maxWidth="xl" disableGutters>
      <Grid container spacing={0} alignItems="stretch" minHeight={'100vh'}>
        <Grid item xs={1}>
          <LeftSidePanel />
        </Grid>
        <Grid item xs={11}>
          <AppRouter></AppRouter>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
