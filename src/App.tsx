import Grid from '@mui/material/Unstable_Grid2';

import './App.css';
import LeftSidePanel from './components/leftSide/LeftSidePanel';
import { useUserStore } from './hooks/userStore';
import AppRouter from './router';

function App() {
  const [userInfo, dispatch] = useUserStore();

  return (
    <>
      <Grid container spacing={0} minHeight={'100vh'}>
        <Grid xs={2} lg={1} alignItems="stretch" sx={{ textAlign: 'center' }}>
          <LeftSidePanel />
        </Grid>
        <Grid xs={10} lg={11}>
          <AppRouter></AppRouter>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
