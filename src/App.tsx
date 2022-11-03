import Grid from '@mui/material/Unstable_Grid2';

import './App.css';
import LeftSidePanel from './components/LeftSidePanel';
import AppRouter from './router';

function App() {
  return (
    // <Container maxWidth="xl" disableGutters>
    <Grid container spacing={0} alignItems="stretch" minHeight={'100vh'}>
      <Grid xs={1} alignItems="stretch" sx={{ textAlign: 'center', backgroundColor: '#fff' }}>
        <LeftSidePanel />
      </Grid>
      <Grid xs={11}>
        <AppRouter></AppRouter>
      </Grid>
    </Grid>
    // </Container>
  );
}

export default App;
