import Grid from '@mui/material/Unstable_Grid2';
import Assets from './assets/Index';
import List from './list/Index';

export default function DaoList() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      paddingTop="64px"
      paddingBottom="21px">
      <Grid xs={12}>
        <Assets />
      </Grid>
      <Grid xs={12}>
        <List />
      </Grid>
    </Grid>
  );
}
