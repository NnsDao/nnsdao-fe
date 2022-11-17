import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { Divider, IconButton, Paper, Stack, Typography } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import React, { useEffect } from 'react';
import { useDebounce } from 'usehooks-ts';

export default function DashBoard({ search: setSearch }) {
  const [inputVal, setInputVal] = React.useState('');
  const debouncedVal = useDebounce(inputVal, 300);
  useEffect(() => {
    setSearch(debouncedVal);
  }, [debouncedVal]);
  const search = e => {
    setInputVal(e.currentTarget.value);
  };
  return (
    <React.Fragment>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack paddingY={'30px'}>
          <Typography sx={{ fontFamily: 'Poppins', fontWeight: 600, fontSize: '24px', lineHeight: '36px' }}>
            Dashboard
          </Typography>
          <Typography sx={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '14px', lineHeight: '21px' }}>
            Create a DAO for DAOs.
          </Typography>
        </Stack>
        <Stack direction="row" spacing={{ xl: 2, sm: 1 }}>
          <Paper
            sx={{
              height: 42,
              width: 240,
              display: 'flex',
              alignItems: 'center',
              borderRadius: 23,
              background: '#A8A8AC',
              border: '1px solid #F9FAFB',
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
          <NotificationsActiveIcon
            sx={{
              width: '40px',
              height: '40px',
              padding: '8px',
              background: '#5BC0FA',
              borderRadius: '12px',
              cursor: 'pointer',
            }}></NotificationsActiveIcon>
          <PersonIcon
            sx={{
              width: '40px',
              height: '40px',
              padding: '8px',
              background: '#5BC0FA',
              borderRadius: '12px',
              cursor: 'pointer',
            }}></PersonIcon>
        </Stack>
      </Stack>
      <Divider></Divider>
    </React.Fragment>
  );
}
