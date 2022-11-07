import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, Paper } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
export default function DashBoard(props) {
  const [searchStr, setSearch] = useState('');
  const submit = e => {
    e.preventDefault();
    e.stopPropagation();
    props.onchange(searchStr);
    // console.log();
  };
  const search = e => {
    setSearch(e.currentTarget.value);
  };
  return (
    <Grid container xs={12} display="flex" justifyContent="space-between" alignItems="center">
      <Grid xs="auto" paddingY={'30px'}>
        <Grid sx={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '24px', lineHeight: '36px' }}>Dashboard</Grid>
        <Grid sx={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', lineHeight: '21px' }}>
          Create a DAO for DAOs.
        </Grid>
      </Grid>
      <Grid xs="auto" container alignItems="center" spacing={2}>
        <Paper
          component="form"
          sx={{
            height: 42,
            width: 240,
            display: 'flex',
            alignItems: 'center',
            borderRadius: 23,
            background: '#A8A8AC',
            border: '1px solid #F9FAFB',
            '&:hover': { border: '1px solid #39a8d3' },
          }}>
          <IconButton aria-label="menu">
            <SearchIcon htmlColor="#fff" />
          </IconButton>
          <InputBase
            sx={{
              flex: 1,
              color: '#000',
              '&::placeholder': {
                color: '#000',
              },
            }}
            placeholder="Find DAOs"
            onChange={search}
          />
        </Paper>
        <Grid display="flex" justifyContent="space-between" alignItems="center">
          <NotificationsActiveIcon
            sx={{
              width: '40px',
              height: '40px',
              padding: '8px',
              background: '#5BC0FA',
              borderRadius: '12px',
              cursor: 'pointer',
            }}></NotificationsActiveIcon>
        </Grid>
        <Grid display="flex" justifyContent="space-between" alignItems="center">
          <PersonIcon
            sx={{
              width: '40px',
              height: '40px',
              padding: '8px',
              background: '#5BC0FA',
              borderRadius: '12px',
              cursor: 'pointer',
            }}></PersonIcon>
        </Grid>
      </Grid>
    </Grid>
  );
}
