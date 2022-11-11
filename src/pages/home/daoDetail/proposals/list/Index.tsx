import { Avatar } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/system';
import { useLocation, useNavigate } from 'react-router-dom';

export default function List() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const data = Array.from({ length: 10 }).map((item, i) => ({
    TARGET: i + 1,
    SECTION: i + 1,
    DUEDATE: i + 1,
    MEMBERS: i + 1,
    STATUS: i + 1,
  }));
  return (
    <Grid>
      <Grid container>
        <Grid xs={4}>TARGET</Grid>
        <Grid xs={1.5}>SECTION</Grid>
        <Grid xs={1.5}>DUE DATE</Grid>
        <Grid xs={2.5}>MEMBERS</Grid>
        <Grid xs={1.5}>STATUS</Grid>
        <Grid xs={1}></Grid>
      </Grid>
      {data.map(item => (
        <Grid container key={item.DUEDATE}>
          <Box sx={{ margin: '14px 0 11px 0', width: '100%', borderTop: '1px dotted #D7D3D3' }} />
          <Grid container alignItems="center" sx={{ paddingY: '16px' }} xs={12}>
            <Grid
              container
              alignItems="center"
              xs={4}
              sx={{
                fontSamily: 'Roboto',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '18px',
                lineHeight: '30px',
                letterSpacing: '-0.02em',
                color: '#181C32',
              }}>
              GR15 Round Structure
            </Grid>
            <Grid container alignItems="center" xs={1.5}>
              grants
            </Grid>
            <Grid
              container
              alignItems="center"
              xs={1.5}
              sx={{
                fontSamily: 'Roboto',
                fontStyle: 'normal',
                fontWeight: '500',
                fontSize: '18px',
                lineHeight: '30px',
                letterSpacing: '-0.02em',
                color: '#181C32',
              }}>
              Jan 9, 2023
            </Grid>
            <Grid container direction="row" alignItems="center" xs={2.5}>
              <Avatar></Avatar>
              <Avatar></Avatar>
              <Avatar></Avatar>
            </Grid>
            <Grid container alignItems="center" xs={1.5}>
              Active
            </Grid>
            <Grid container alignItems="center" xs={1}>
              View
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
