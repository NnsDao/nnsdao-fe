import { Box, Button, Stack } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTotalDaoLists } from '../../api/dao_manager';
import LoadingWrapper from '../../components/LoadingWrapper';
import DashBoard from './components/dashBoard/Index';
import SelectButton from './daoList/assets/selectButton/Index';
import List from './daoList/list/Index';

export default function Home(props) {
  const navigate = useNavigate();
  const DaoList = LoadingWrapper(List, useTotalDaoLists);
  const [searchStr, setSearch] = React.useState('');
  const [statusStr, setStatusFilter] = React.useState('');
  // console.log('setStatusFilter statusStr', searchStr, statusStr);

  return (
    <React.Fragment>
      <DashBoard search={setSearch} />
      <Stack my={{ xl: 3, sm: 1 }} direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <span style={{ fontFamily: 'Roboto', fontWeight: 500, fontSize: '20px' }}>DAOs DAPP &nbsp;</span>
          {/* <span style={{ fontWeight: 700, fontSize: '12px', lineHeight: '23px', color: '#A1A5B7' }}>Active</span> */}
        </Box>
        <Stack direction="row" alignItems="center" spacing={{ xl: 2, sm: 1 }}>
          <SelectButton onchange={setStatusFilter} />
          <Button variant="contained" onClick={() => navigate(`/createDao`)}>
            New DAOs
          </Button>
        </Stack>
      </Stack>
      <DaoList filterStr={searchStr} statusStr={statusStr}></DaoList>
    </React.Fragment>
  );
}
