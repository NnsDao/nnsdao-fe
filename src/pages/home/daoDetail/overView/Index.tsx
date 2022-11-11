import Grid from '@mui/material/Unstable_Grid2';
import ActiveUser from './activeUser/Index';
import Introduction from './introduction/Index';
import NewsMember from './newsMember/Index';
import Treasury from './treasury/Index';

export default function OverView() {
  return (
    <Grid container alignItems="center" xs={12}>
      <Grid container justifyContent="space-between" xs={12} spacing={1}>
        <Grid
          xs={3.8}
          bgcolor={'#fff'}
          padding="23px 30px"
          borderRadius="12px"
          boxShadow="0px 0px 20px rgba(76, 87, 125, 0.02)">
          <ActiveUser></ActiveUser>
        </Grid>
        <Grid
          xs={3.8}
          padding="23px 30px"
          bgcolor={'#fff'}
          borderRadius="12px"
          boxShadow="0px 0px 20px rgba(76, 87, 125, 0.02)">
          <NewsMember></NewsMember>
        </Grid>
        <Grid
          xs={3.8}
          padding="23px 30px"
          bgcolor={'#fff'}
          borderRadius="12px"
          boxShadow="0px 0px 20px rgba(76, 87, 125, 0.02)">
          <Treasury></Treasury>
        </Grid>
      </Grid>
      <Grid xs={12} marginY="30px" padding="43px 29px 30px 30px" bgcolor={'#fff'} borderRadius="12px">
        <Introduction></Introduction>
      </Grid>
    </Grid>
  );
}
