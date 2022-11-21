import Grid from '@mui/material/Unstable_Grid2';
import { Stack } from '@mui/system';
import ActiveUser from './activeUser/Index';
import Introduction from './introduction/Index';
import NewsMember from './newsMember/Index';
import Treasury from './treasury/Index';

export default function OverView() {
  return (
    <Stack spacing={{ lg: 4, sm: 2 }}>
      <Grid container alignItems="stretch" spacing={{ xl: 1, sm: 2 }}>
        <Grid sm={12} lg={4}>
          <ActiveUser></ActiveUser>
        </Grid>
        <Grid sm={12} lg={4}>
          <Treasury></Treasury>
        </Grid>
        <Grid sm={12} lg={4}>
          <NewsMember></NewsMember>
        </Grid>
      </Grid>
      <Introduction></Introduction>
    </Stack>
  );
}
