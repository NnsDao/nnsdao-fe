import Grid from '@mui/material/Unstable_Grid2';

import './App.css';
import LeftSidePanel from './components/leftSide/LeftSidePanel';
import AppRouter from './router';

function App() {
  return (
    // <Container maxWidth="xl" disableGutters>
    <Grid container spacing={0} alignItems="stretch" minHeight={'100vh'}>
      <Grid xs={2} lg={1} alignItems="stretch" sx={{ textAlign: 'center', backgroundColor: '#fff' }}>
        <LeftSidePanel />
      </Grid>
      <Grid xs={10} lg={11}>
        <AppRouter></AppRouter>
      </Grid>
    </Grid>
    // </Container>
  );
}

export default App;
