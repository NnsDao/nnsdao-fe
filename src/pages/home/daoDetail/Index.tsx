import Grid from '@mui/material/Unstable_Grid2';
import { Outlet } from 'react-router-dom';
import NavLeft from './components/navLeft/Index';

export default function DaoDetail() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      paddingTop="64px"
      paddingBottom="21px">
      <NavLeft />
      <Grid xs={8}>
        <Outlet></Outlet>
      </Grid>
    </Grid>
  );
}
