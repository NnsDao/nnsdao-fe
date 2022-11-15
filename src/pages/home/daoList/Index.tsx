import { Box, Button, Stack } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SelectButton from './assets/selectButton/Index';
import List from './list/Index';

export default function DaoList() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Stack my={{ xl: 3, sm: 1 }} direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <span style={{ fontFamily: 'Roboto', fontWeight: 500, fontSize: '20px' }}>DAOs DAPP &nbsp;</span>
          <span style={{ fontWeight: 700, fontSize: '12px', lineHeight: '23px', color: '#A1A5B7' }}>Active</span>
        </Box>
        <Stack direction="row" alignItems="center" spacing={{ xl: 2, sm: 1 }}>
          <SelectButton />
          <Button variant="contained">New DAOs</Button>
        </Stack>
      </Stack>
      <List />
    </React.Fragment>
  );
}
