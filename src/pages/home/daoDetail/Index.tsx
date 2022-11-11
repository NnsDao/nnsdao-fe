import Grid from '@mui/material/Unstable_Grid2';
import { Outlet } from 'react-router-dom';
import NavLeft from './components/navLeft/Index';

export default function DaoDetail() {
  return (
    <Grid container paddingTop="64px" paddingBottom="21px">
      <Grid xs={2.5}>
        <NavLeft />
      </Grid>
      <Grid xs={9.5}>
        <Outlet></Outlet>
      </Grid>
    </Grid>
  );
}
