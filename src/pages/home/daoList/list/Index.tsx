import { Avatar, Box, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useLocation, useNavigate } from 'react-router-dom';

export default function List() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const toDaoDetail = item => {
    navigate(`/daoDetail/${item.name}`);
  };
  const data = Array.from({ length: 20 }).map((item, i) => ({
    avatar: i + 1,
    name: i + 1,
    status: i + 1,
  }));

  return (
    <Grid container spacing={-2}>
      {data.map(item => (
        <Grid
          key={item.name}
          xs={12}
          md={6}
          xl={4}
          container
          direction="column"
          bgcolor="#fff"
          borderRadius="12px"
          padding="30px 30px 22px 30px"
          boxShadow=" 0px 0px 20px rgba(76, 87, 125, 0.02)"
          onClick={() => toDaoDetail(item)}>
          <Grid container justifyContent="space-between">
            <Box sx={{ padding: '12px', background: '#F5F8FA', borderRadius: '6px' }}>logo</Box>
            <Box>{item.status}</Box>
          </Grid>
          <Grid
            container
            sx={{
              paddingTop: '23px',
              fontFamily: 'Roboto',
              fontWeight: 700,
              fontSize: '22px',
              lineHeight: '30px',
              letterSpacing: '-0.02em',
              color: '#181C32',
            }}>
            DAO name
          </Grid>

          <Grid
            container
            sx={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '30px',
              letterSpacing: '-0.02em',
              color: '#B5B5C3',
            }}>
            DAO Info
          </Grid>
          <Grid container justifyContent="space-between" padding="24px 0 30px 0">
            <Grid container>
              <Box sx={{ border: '1px dashed grey', padding: '9px 33px 10px 13px' }}>
                <Box
                  sx={{
                    fontFamily: 'Roboto',
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '16px',
                    color: '#5E6278',
                    paddingBottom: '3px',
                  }}>
                  Feb 6, 2021
                </Box>
                <Box
                  sx={{
                    fontFamily: 'Roboto',
                    fontWeight: 500,
                    fontSize: '13px',
                    lineHeight: '15px',
                    color: '#B5B5C3',
                  }}>
                  Due Date
                </Box>
              </Box>
            </Grid>
            <Grid container>
              <Box sx={{ border: '1px dashed grey', padding: '9px 33px 10px 13px' }}>
                <Box
                  sx={{
                    fontFamily: 'Roboto',
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '16px',
                    color: '#5E6278',
                    paddingBottom: '3px',
                  }}>
                  $11111
                </Box>
                <Box
                  sx={{
                    fontFamily: 'Roboto',
                    fontWeight: 500,
                    fontSize: '13px',
                    lineHeight: '15px',
                    color: '#B5B5C3',
                  }}>
                  Budget
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Grid container justifyContent="space-between" alignItems="center">
            <Grid container justifyContent="space-between">
              <Avatar></Avatar>
              <Avatar></Avatar>
              <Avatar></Avatar>
            </Grid>
            <Button variant="contained">join</Button>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
