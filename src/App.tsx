import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import './App.css';
import LeftSidePanel from './components/leftSide/LeftSidePanel';
import AppRouter from './router';

function App() {
  return (
    // <Container maxWidth="xl" disableGutters>
    <Box className="APP">
      <Grid container spacing={0} alignItems="stretch" minHeight={'100vh'}>
        <Grid xs={2} lg={1} alignItems="stretch" sx={{ textAlign: 'center' }}>
          <LeftSidePanel />
        </Grid>
        <Grid xs={10} lg={11}>
          <AppRouter></AppRouter>
        </Grid>
      </Grid>
    </Box>

    // </Container>
  );
}

export default App;
