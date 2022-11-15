import { Avatar, AvatarGroup, Box, Button, Paper, Stack, Typography } from '@mui/material';
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
    <Grid container spacing={{ lg: 3, sm: 2 }}>
      {data.map(item => (
        <Grid key={item.name} xs={12} sm={6} md={4} xl={3}>
          <Paper elevation={3}>
            <Stack spacing={{ sm: 2 }} p={'30px'}>
              <Stack direction="row" justifyContent="space-between" alignItems={'center'}>
                <Avatar
                  src="/logo.png"
                  sx={{
                    width: '46px',
                    height: '46px',
                    padding: '12px',
                    background: '#F5F8FA',
                    borderRadius: '6px',
                  }}></Avatar>
                <Box>{item.status}</Box>
              </Stack>
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: 'Roboto',
                    fontWeight: 700,
                    fontSize: '22px',
                    lineHeight: '30px',
                    color: '#181C32',
                  }}>
                  DAO name
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Roboto',
                    fontWeight: 500,
                    fontSize: '16px',
                    color: '#B5B5C3',
                  }}>
                  DAO Info
                </Typography>
              </Box>
              <Stack direction="row" justifyContent={'space-between'}>
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
              </Stack>

              <Stack direction="row" justifyContent={'space-between'} alignItems="center">
                <AvatarGroup max={3}>
                  <Avatar></Avatar>
                  <Avatar></Avatar>
                  <Avatar></Avatar>
                  <Avatar></Avatar>
                </AvatarGroup>
                <Button variant="contained">Join</Button>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
