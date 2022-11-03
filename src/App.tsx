import { Container, Grid } from '@mui/material';

import './App.css';
import LeftSidePanel from './components/LeftSidePanel';
import AppRouter from './router';

function App() {
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
